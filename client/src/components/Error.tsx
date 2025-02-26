
export default function Error({ children }: { children: React.ReactNode }) {
  return <span className=" text-xs text-red-600 uppercase">{children}</span>;
}
