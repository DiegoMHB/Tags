import { create } from "zustand";
import { PostType } from "../types/postTypes";
import { User } from "../types/userTypes";
import { ChatType } from "../types/appTypes";
import zukeeper from "zukeeper"

const port = import.meta.env.VITE_PORT;
const url = `http://localhost:${port}/`

export type AppStoreType = {
    error: string,
    loading: boolean,

    selectedFile: File | null,
    mapRender: boolean,
    fotoUrl: string,

    allActivePosts: PostType[],
    authUserPostsList: PostType[] | []
    selectedUser: User | null,
    selectedPost: PostType | null,
    selectedChat: ChatType | null,
    allPostChats: ChatType[] | null,
    
    
    authUserActivePost: PostType | null,
    setSelectedPost: (postId: string) => void,
    deselectUser: () => void,
    deselectPost: () => void,
    deselectChat: () => void,
    resetSelected : ()=>void,


    setMapRender: () => void,
    setFotoUrl: (url: string) => void,
    setSelectedFile: (file: File | null) => void,
    getAllPosts: () => void,
    getUserById: (userId: string, returns?: boolean) => Promise<void | User>,
}


export const appStore = create<AppStoreType>(
    zukeeper((set, get) => ({
      error: "",
      loading: false,
      mapRender: false,
      fotoUrl: "",
      selectedFile: null,
  
      allActivePosts: [],
      authUserPostsList: [],
      authUserActivePost: null,
      selectedUser: null,
      selectedPost: null,
      selectedChat: null,
      allPostChats: null,
  
      setMapRender: () => set((state) => ({ mapRender: !state.mapRender })),
      setFotoUrl: (newUrl) => set({ fotoUrl: newUrl }),
      setSelectedFile: (file) => set({ selectedFile: file }),
  
      deselectChat: () => set({ selectedChat: null }),
      deselectUser: () => set({ selectedUser: null }),
      deselectPost: () => set({ selectedPost: null }),
  
      setSelectedPost: (postId : string) =>{ 
        const allPosts = [...get().allActivePosts, ...get().authUserPostsList];
        const post = allPosts.find(post => post.id === postId);
        set({ selectedPost: post })},
  
      resetSelected: () => set({ selectedPost: null, selectedUser: null, selectedChat: null }),
  
      getAllPosts: async () => {
        set({ loading: true });
        console.log("getAllPosts");
  
        if (get().allActivePosts.length) {
          set({ allActivePosts: [] });
        }
  
        try {
          const response = await fetch(`${url}getAllPosts`);
          if (!response.ok) throw new Error("Couldn't get active posts");
  
          const data = await response.json();
          set({ loading: false, allActivePosts: data.posts });
        } catch (error) {
          console.error(error);
        }
      },
  
      getUserById: async (userId: string, returns: boolean = false) => {
        set({ loading: true });
        console.log("getUserById");
  
        try {
          const response = await fetch(`${url}user/${userId}`);
          if (!response.ok) {
            const data = await response.json();
            set({ error: data.error });
            throw data;
          }
  
          const data = await response.json();
          if (returns) return data.user;
          set({ selectedUser: data.user });
        } catch (e) {
          console.log("Error", e);
        } finally {
          set({ error: "", loading: false });
        }
      }
    }))
  );
  