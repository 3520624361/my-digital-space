"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, User, Reply, ChevronDown } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import type { Comment } from "@/types";

interface CommentSectionProps {
  postId: string;
}

const mockComments: Comment[] = [
  {
    id: "1",
    content: "写得太好了！这篇文章让我对AI有了更深的理解。",
    depth: 0,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    author: { id: "u1", username: "ai_fan", displayName: "AI爱好者", avatarUrl: null },
    replies: [
      {
        id: "2",
        content: "谢谢支持！后续还会有更多相关内容。",
        depth: 1,
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        author: { id: "u2", username: "admin", displayName: "站长", avatarUrl: null },
      },
    ],
  },
];

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment.trim(),
      depth: 0,
      createdAt: new Date().toISOString(),
      author: { id: "me", username: "visitor", displayName: "访客", avatarUrl: null },
    };
    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleReply = (parentId: string) => {
    if (!replyContent.trim()) return;
    const reply: Comment = {
      id: Date.now().toString(),
      content: replyContent.trim(),
      depth: 1,
      createdAt: new Date().toISOString(),
      author: { id: "me", username: "visitor", displayName: "访客", avatarUrl: null },
    };

    setComments(comments.map(c =>
      c.id === parentId
        ? { ...c, replies: [...(c.replies || []), reply] }
        : c
    ));
    setReplyTo(null);
    setReplyContent("");
  };

  return (
    <div className="glass-card p-6">
      <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold">
        <MessageCircle className="h-5 w-5 text-accent" />
        评论 ({comments.length})
      </h3>

      {/* Comment Form */}
      <div className="mb-8 flex gap-3">
        <Avatar size="md" fallback="U" />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="写下你的想法..."
            rows={3}
            className="w-full rounded-lg border border-card-border bg-transparent p-3 text-sm placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
          />
          <div className="mt-2 flex justify-end">
            <Button onClick={handleSubmit} disabled={!newComment.trim()} size="sm">
              发表评论
            </Button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex gap-3">
                  <Avatar
                    size="md"
                    fallback={comment.author.displayName?.[0] || "U"}
                  />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {comment.author.displayName || comment.author.username}
                      </span>
                      <span className="text-xs text-muted">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80">{comment.content}</p>
                    <button
                      onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                      className="mt-1 flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors"
                    >
                      <Reply className="h-3 w-3" />
                      回复
                    </button>

                    {/* Reply Form */}
                    {replyTo === comment.id && (
                      <div className="mt-3 flex gap-2">
                        <Input
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder={`回复 ${comment.author.displayName || comment.author.username}...`}
                          className="flex-1"
                        />
                        <Button onClick={() => handleReply(comment.id)} size="sm">
                          回复
                        </Button>
                      </div>
                    )}

                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="mt-4 space-y-4 border-l-2 border-card-border pl-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar
                              size="sm"
                              fallback={reply.author.displayName?.[0] || "U"}
                            />
                            <div>
                              <div className="mb-1 flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {reply.author.displayName || reply.author.username}
                                </span>
                                <span className="text-xs text-muted">
                                  {formatDate(reply.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm text-foreground/80">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center py-10 text-muted">
          <MessageCircle className="mb-2 h-8 w-8" />
          <p>暂无评论，来说点什么吧</p>
        </div>
      )}
    </div>
  );
}
