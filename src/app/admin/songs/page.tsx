"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Music, Plus, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import toast from "react-hot-toast";

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string | null;
  duration: number;
  coverUrl: string | null;
  audioUrl: string;
  lyrics: string | null;
  playCount: number;
}

export default function AdminSongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    title: "", artist: "", album: "", duration: 0,
    coverUrl: "", audioUrl: "", lyrics: "",
  });

  const fetchSongs = async () => {
    try {
      const params = search ? `?search=${search}` : "";
      const res = await fetch(`/api/admin/songs${params}`);
      const data = await res.json();
      if (data.success) setSongs(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  useEffect(() => {
    if (search) fetchSongs();
  }, [search]);

  const resetForm = () => {
    setForm({ title: "", artist: "", album: "", duration: 0, coverUrl: "", audioUrl: "", lyrics: "" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.artist.trim() || !form.audioUrl.trim()) {
      toast.error("歌曲名、歌手和音频链接不能为空");
      return;
    }

    try {
      const url = editingId ? `/api/admin/songs/${editingId}` : "/api/admin/songs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingId ? "歌曲已更新" : "歌曲已添加");
        resetForm();
        fetchSongs();
      } else {
        toast.error(data.error || "操作失败");
      }
    } catch {
      toast.error("操作失败");
    }
  };

  const handleEdit = (song: Song) => {
    setEditingId(song.id);
    setForm({
      title: song.title, artist: song.artist, album: song.album || "",
      duration: song.duration, coverUrl: song.coverUrl || "",
      audioUrl: song.audioUrl, lyrics: song.lyrics || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`确定要删除歌曲「${title}」吗？`)) return;
    try {
      const res = await fetch(`/api/admin/songs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("歌曲已删除");
        fetchSongs();
      } else {
        toast.error(data.error || "删除失败");
      }
    } catch {
      toast.error("删除失败");
    }
  };

  const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full" /></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">音乐管理</h1>
          <p className="text-sm text-muted">共 {songs.length} 首歌曲</p>
        </div>
        <Button className="gap-2" onClick={() => { resetForm(); setShowForm(!showForm); }}>
          <Plus className="h-4 w-4" />添加歌曲
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <Input
          placeholder="搜索歌曲..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Form */}
      {showForm && (
        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="glass-card mb-6 space-y-4 p-6">
          <h3 className="font-semibold">{editingId ? "编辑歌曲" : "添加歌曲"}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="歌曲名 *" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Input placeholder="歌手 *" value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} />
            <Input placeholder="专辑" value={form.album} onChange={(e) => setForm({ ...form, album: e.target.value })} />
            <Input placeholder="时长(秒)" type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: parseInt(e.target.value) || 0 })} />
            <Input placeholder="封面图片链接" value={form.coverUrl} onChange={(e) => setForm({ ...form, coverUrl: e.target.value })} />
            <Input placeholder="音频链接 *" value={form.audioUrl} onChange={(e) => setForm({ ...form, audioUrl: e.target.value })} />
          </div>
          <Textarea placeholder="歌词（可选）" rows={4} value={form.lyrics} onChange={(e) => setForm({ ...form, lyrics: e.target.value })} />
          <div className="flex gap-3">
            <Button type="submit">{editingId ? "保存" : "添加"}</Button>
            <Button type="button" variant="outline" onClick={resetForm}>取消</Button>
          </div>
        </motion.form>
      )}

      {/* Song List */}
      {songs.length === 0 ? (
        <div className="glass-card flex flex-col items-center py-16">
          <Music className="mb-4 h-12 w-12 text-muted" />
          <p className="text-lg text-muted">暂无歌曲</p>
          <p className="mt-1 text-sm text-muted/60">点"添加歌曲"开始</p>
        </div>
      ) : (
        <div className="space-y-2">
          {songs.map((song) => (
            <motion.div key={song.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className="glass-card flex items-center gap-4 p-3"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10">
                {song.coverUrl ? (
                  <img src={song.coverUrl} alt="" className="h-full w-full rounded-md object-cover" />
                ) : (
                  <Music className="h-5 w-5 text-accent" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-sm">{song.title}</p>
                <p className="truncate text-xs text-muted">{song.artist}{song.album ? ` · ${song.album}` : ""}</p>
              </div>
              <span className="text-xs text-muted shrink-0">{formatDuration(song.duration)}</span>
              <span className="text-xs text-muted shrink-0">播放 {song.playCount}</span>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(song)}><Edit2 className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(song.id, song.title)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
