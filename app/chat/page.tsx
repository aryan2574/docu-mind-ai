// src/app/chat/page.tsx
"use client";

import { Fragment, useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, isToolUIPart } from "ai";
import type { ChatMessage } from "@/app/api/chat/route";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, X } from "lucide-react";
import { useAuthRole } from "@/hooks/use-auth-role";
import { processPdfFile } from "@/lib/upload";

export default function RAGChatBot() {
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { hasUploadAccess } = useAuthRole();

  const { messages, sendMessage, status } = useChat<ChatMessage>({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) {
      return;
    }
    sendMessage({
      text: message.text,
    });
    setInput("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const result = await processPdfFile(formData);

      if (result.success) {
        setUploadMessage({
          type: "success",
          text: result.message || "PDF processed successfully! You can now ask questions about it.",
        });
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setUploadMessage({
          type: "error",
          text: result.error || "Failed to process PDF",
        });
      }
    } catch (err: unknown) {
      console.error(err);
      setUploadMessage({
        type: "error",
        text: "An error occurred while processing the PDF",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const dismissUploadMessage = () => {
    setUploadMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-4rem)]">
      <div className="flex flex-col h-full">
        {/* Upload Success/Error Message */}
        {uploadMessage && (
          <Alert
            variant={uploadMessage.type === "error" ? "destructive" : "default"}
            className="mb-4"
          >
            <div className="flex items-center justify-between">
              <AlertDescription>{uploadMessage.text}</AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissUploadMessage}
                className="h-auto p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </Alert>
        )}

        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.parts.map((part, i) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Fragment key={`${message.id}-${i}`}>
                          <Message from={message.role}>
                            <MessageContent>
                              <MessageResponse>{part.text}</MessageResponse>
                            </MessageContent>
                          </Message>
                        </Fragment>
                      );
                    default:
                      if (isToolUIPart(part)) {
                        return (
                          <Message from={message.role} key={`${message.id}-${i}`}>
                            <MessageContent>
                              <Tool open={false}>
                                <ToolHeader
                                  type="dynamic-tool"
                                  state={part.state}
                                  title="🔍 Searching documents..."
                                  toolName="searchKnowledgeBase"
                                />
                                <ToolContent>
                                  <div className="text-sm text-muted-foreground">
                                    Query: "{(part.input as any)?.query || 'searching...'}"
                                  </div>
                                </ToolContent>
                              </Tool>
                            </MessageContent>
                          </Message>
                        );
                      }
                      return null;
                  }
                })}
              </div>
            ))}
            {(status === "submitted" || status === "streaming") && (
              <Spinner className="size-4" />
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          className="hidden"
        />

        <PromptInput onSubmit={handleSubmit} className="mt-4">
          <PromptInputBody>
            <PromptInputTextarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your documents..."
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              {hasUploadAccess && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={triggerFileUpload}
                  disabled={isUploading}
                  className="flex items-center gap-2"
                >
                  {isUploading ? (
                    <>
                      <Spinner className="h-4 w-4" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Upload PDF
                    </>
                  )}
                </Button>
              )}
            </PromptInputTools>
            <PromptInputSubmit disabled={!input && !status} status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}
