import { supabase } from "@/lib/supabase";
import type { APIResponse, UserProfile } from "@/types";

export async function signUp(email: string, password: string, username: string): Promise<APIResponse<UserProfile>> {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { success: false, error: error.message };

  if (data.user) {
    const { data: profile, error: profileError } = await supabase
      .from("User")
      .insert({ id: data.user.id, email, username })
      .select()
      .single();

    if (profileError) return { success: false, error: profileError.message };
    return { success: true, data: profile as unknown as UserProfile };
  }

  return { success: false, error: "注册失败" };
}

export async function signIn(email: string, password: string): Promise<APIResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("User")
    .select("*")
    .eq("id", user.id)
    .single();

  return data as unknown as UserProfile;
}

export async function signInWithGithub(): Promise<void> {
  await supabase.auth.signInWithOAuth({ provider: "github" });
}

export async function signInWithGoogle(): Promise<void> {
  await supabase.auth.signInWithOAuth({ provider: "google" });
}
