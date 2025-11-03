import "@testing-library/jest-dom";
import "whatwg-fetch";

// Polyfill for TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
