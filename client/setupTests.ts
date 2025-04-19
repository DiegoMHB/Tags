import '@testing-library/jest-dom';

// Si aún te da error con TextEncoder/TextDecoder:
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
