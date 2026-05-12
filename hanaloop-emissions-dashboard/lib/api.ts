import { countries, companies, posts } from "./seed/data";
import type { Post } from "./seed/types";

let _countries = [...countries];
let _companies = [...companies];
let _posts = [...posts];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

export async function fetchCountries() {
  await delay(jitter());
  return _countries;
}

export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

export async function fetchPosts() {
  await delay(jitter());
  return _posts;
}

export async function createOrUpdatePost(
  p: Omit<Post, "id"> & { id?: string }
): Promise<Post> {
  await delay(jitter());
  if (maybeFail()) throw new Error("Save failed. Please try again.");

  if (p.id) {
    _posts = _posts.map((x) => (x.id === p.id ? (p as Post) : x));
    return p as Post;
  }

  const created: Post = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}

export async function deletePost(id: string): Promise<void> {
  await delay(jitter());
  if (maybeFail()) throw new Error("Delete failed. Please try again.");
  _posts = _posts.filter((x) => x.id !== id);
}