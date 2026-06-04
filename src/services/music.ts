import { prisma } from "@/lib/prisma";
import type { Song, Playlist } from "@/types";

export async function getSongs(page = 1, pageSize = 20): Promise<Song[]> {
  const songs = await prisma.song.findMany({
    orderBy: { playCount: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return songs as unknown as Song[];
}

export async function searchSongs(query: string): Promise<Song[]> {
  return prisma.song.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { artist: { contains: query, mode: "insensitive" } },
      ],
    },
    take: 20,
  }) as unknown as Song[];
}

export async function getPlaylists(userId?: string): Promise<Playlist[]> {
  const where = userId ? { userId } : { isPublic: true };
  return prisma.playlist.findMany({
    where,
    include: { songs: { include: { song: true }, orderBy: { order: "asc" } } },
  }).then((playlists: any[]) => playlists.map((p: any) => ({
    ...p,
    songs: p.songs.map((ps: any) => ps.song),
  }))) as unknown as Playlist[];
}

export async function createPlaylist(name: string, userId: string): Promise<Playlist> {
  return prisma.playlist.create({
    data: { name, userId },
    include: { songs: { include: { song: true } } },
  }) as unknown as Playlist;
}

export async function addSongToPlaylist(playlistId: string, songId: string): Promise<void> {
  const maxOrder = await prisma.playlistSong.findFirst({
    where: { playlistId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  await prisma.playlistSong.create({
    data: { playlistId, songId, order: (maxOrder?.order ?? -1) + 1 },
  });

  await prisma.song.update({ where: { id: songId }, data: { playCount: { increment: 1 } } });
}
