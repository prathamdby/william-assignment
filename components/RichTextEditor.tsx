"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikethroughIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Video as VideoIcon,
  Smile as SmileIcon,
  AlignLeft,
} from "lucide-react";

// Define the type for heading levels
type Level = 1 | 2 | 3 | 4 | 5 | 6;

interface RichTextEditorProps {
  placeholder?: string;
  initialContent?: string;
  onChange?: (content: string) => void;
  className?: string;
}

const RichTextEditor = ({
  placeholder = "Ask your question",
  initialContent = "",
  onChange,
  className = "",
}: RichTextEditorProps) => {
  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const [currentHeadingLevel, setCurrentHeadingLevel] = useState<Level>(1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Initialize TipTap editor
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // We configure it separately below
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      BulletList,
      OrderedList,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline hover:text-blue-700",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full rounded",
        },
      }),
      Bold,
      Italic,
      Strike,
      Underline,
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html);
    },
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    autofocus: "end",
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowHeadingDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle heading selection
  const handleHeadingChange = (level: Level) => {
    editor?.chain().focus().toggleHeading({ level }).run();
    setCurrentHeadingLevel(level);
    setShowHeadingDropdown(false);
  };

  // Format heading display text
  const getHeadingText = () => {
    return `Heading ${currentHeadingLevel}`;
  };

  // Add custom CSS for the editor
  useEffect(() => {
    if (editor) {
      // Add custom styles to editor
      const style = document.createElement("style");
      style.innerHTML = `
        .ProseMirror {
          outline: none;
          min-height: 240px;
        }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #94A3B8;
          pointer-events: none;
          height: 0;
          font-family: 'DM Sans', sans-serif;
        }
        .ProseMirror p {
          margin: 0;
          padding: 0;
          line-height: 20px;
          color: #334155;
          font-size: 16px;
        }
        .ProseMirror h1 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0;
          padding: 0;
          color: #1E293B;
          line-height: 1.3;
        }
        .ProseMirror h2 {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          padding: 0;
          color: #1E293B;
          line-height: 1.3;
        }
        .ProseMirror h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
          padding: 0;
          color: #1E293B;
          line-height: 1.3;
        }
        .ProseMirror h4, .ProseMirror h5, .ProseMirror h6 {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          padding: 0;
          color: #1E293B;
          line-height: 1.3;
        }
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0;
          padding-top: 0;
          padding-bottom: 0;
        }
        .ProseMirror ul {
          list-style-type: disc;
        }
        .ProseMirror ol {
          list-style-type: decimal;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          margin: 0.5rem 0;
        }
        .ProseMirror a {
          color: #3B82F6;
          text-decoration: underline;
        }
        .ProseMirror a:hover {
          color: #2563EB;
        }
        .ProseMirror blockquote {
          border-left: 3px solid #CBD5E1;
          padding-left: 1rem;
          margin: 0.5rem 0;
          font-style: italic;
          color: #64748B;
        }
        .ProseMirror code {
          background-color: #F1F5F9;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-family: monospace;
          font-size: 0.9em;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  // Handle image insertion
  const handleImageInsert = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // Handle link insertion
  const handleLinkInsert = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  // Handle video insertion
  const handleVideoInsert = () => {
    const url = window.prompt("Enter video URL (YouTube, Vimeo, etc.)");
    if (!url) return;

    // Extract video ID from YouTube URL
    let videoId = "";
    let embedHtml = "";

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      // Handle YouTube URLs
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1].split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      }

      if (videoId) {
        embedHtml = `<div class="video-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 4px;">
          <iframe 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
            src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>`;
      }
    } else if (url.includes("vimeo.com")) {
      // Handle Vimeo URLs
      const vimeoId = url.split("vimeo.com/")[1].split("?")[0];
      if (vimeoId) {
        embedHtml = `<div class="video-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; border-radius: 4px;">
          <iframe 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
            src="https://player.vimeo.com/video/${vimeoId}" 
            frameborder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>`;
      }
    } else {
      // For other URLs, create a simple video element
      embedHtml = `<div class="video-embed" style="max-width: 100%; border-radius: 4px;">
        <video controls style="width: 100%; max-height: 400px; border-radius: 4px;">
          <source src="${url}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>`;
    }

    if (embedHtml) {
      editor.chain().focus().insertContent(embedHtml).run();
    } else {
      alert(
        "Unable to embed this video. Please provide a valid YouTube, Vimeo, or direct video URL.",
      );
    }
  };

  // Simple emoji picker for demo
  const handleEmojiInsert = () => {
    const emojis = ["😊", "👍", "🎉", "❤️", "🔥", "⭐", "🙌", "👏", "🤔", "😂"];
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "10px";
    container.style.padding = "10px";

    emojis.forEach((emoji) => {
      const button = document.createElement("button");
      button.innerText = emoji;
      button.style.fontSize = "20px";
      button.style.cursor = "pointer";
      button.style.border = "none";
      button.style.background = "none";
      button.onclick = () => {
        editor.chain().focus().insertContent(emoji).run();
        document.body.removeChild(container);
      };
      container.appendChild(button);
    });

    // Position near the cursor
    container.style.position = "absolute";
    container.style.zIndex = "1000";
    container.style.background = "white";
    container.style.border = "1px solid #e2e8f0";
    container.style.borderRadius = "4px";
    container.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";

    const { view } = editor;
    const { top, left } = view.coordsAtPos(view.state.selection.anchor);
    container.style.top = `${top + 20}px`;
    container.style.left = `${left}px`;

    document.body.appendChild(container);

    // Close on click outside
    const closeOnClickOutside = (e: MouseEvent) => {
      if (!container.contains(e.target as Node)) {
        document.body.removeChild(container);
        document.removeEventListener("mousedown", closeOnClickOutside);
      }
    };

    document.addEventListener("mousedown", closeOnClickOutside);
  };

  return (
    <div
      className={`w-full rounded-md border ${
        isFocused
          ? "border-slate-700 ring-1 ring-slate-700"
          : "border-[#CBD5E1]"
      } bg-[#F8FAFC] overflow-hidden transition-colors ${className}`}
    >
      {/* Text formatting toolbar - exact match to Figma design */}
      <div className="flex items-center px-6 py-3 border-b border-[#E2E8F0]">
        {/* All formatting options in a single row with equal spacing */}
        <div className="flex items-center w-full justify-between">
          {/* Heading selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowHeadingDropdown(!showHeadingDropdown)}
              className="flex items-center gap-8"
            >
              <span className="text-base font-semibold text-[#64748B]">
                {getHeadingText()}
              </span>
              <ChevronDown className="w-4 h-4 text-[#CBD5E1] cursor-pointer" />
            </button>
            {showHeadingDropdown && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-white border border-[#E2E8F0] rounded shadow-md z-10">
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <button
                    key={level}
                    onClick={() => handleHeadingChange(level as Level)}
                    className={`block w-full text-left px-3 py-2 text-sm hover:bg-[#F1F5F9] ${
                      currentHeadingLevel === level
                        ? "text-[#334155] font-medium bg-[#F1F5F9]"
                        : "text-[#64748B]"
                    }`}
                  >
                    Heading {level}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Formatting buttons with equal spacing */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1 ${
              editor.isActive("bold") ? "text-[#334155]" : "text-[#64748B]"
            } hover:text-[#334155]`}
            title="Bold"
          >
            <BoldIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1 ${
              editor.isActive("italic") ? "text-[#334155]" : "text-[#64748B]"
            } hover:text-[#334155]`}
            title="Italic"
          >
            <ItalicIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-1 ${
              editor.isActive("underline") ? "text-[#334155]" : "text-[#64748B]"
            } hover:text-[#334155]`}
            title="Underline"
          >
            <UnderlineIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-1 ${
              editor.isActive("strike") ? "text-[#334155]" : "text-[#64748B]"
            } hover:text-[#334155]`}
            title="Strikethrough"
          >
            <StrikethroughIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`p-1 ${
              editor.isActive("paragraph") ? "text-[#334155]" : "text-[#64748B]"
            } hover:text-[#334155]`}
            title="Paragraph"
          >
            <AlignLeft className="w-5 h-5" />
          </button>

          {/* List options with equal spacing */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1 ${
              editor.isActive("bulletList")
                ? "text-[#334155]"
                : "text-[#64748B]"
            } hover:text-[#334155]`}
            title="Bullet List"
          >
            <ListIcon className="w-5 h-5" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1 ${
              editor.isActive("orderedList")
                ? "text-[#334155]"
                : "text-[#64748B]"
            } hover:text-[#334155]`}
            title="Numbered List"
          >
            <ListOrderedIcon className="w-5 h-5" />
          </button>

          {/* Insert options with equal spacing */}
          <button
            onClick={handleLinkInsert}
            className={`p-1 ${
              editor.isActive("link") ? "text-[#334155]" : "text-[#64748B]"
            } hover:text-[#334155]`}
            title="Insert Link"
          >
            <LinkIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleImageInsert}
            className={`p-1 ${
              editor.isActive("image") ? "text-[#334155]" : "text-[#64748B]"
            } hover:text-[#334155]`}
            title="Insert Image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleVideoInsert}
            className="p-1 text-[#64748B] hover:text-[#334155]"
            title="Insert Video"
          >
            <VideoIcon className="w-5 h-5" />
          </button>
          <button
            onClick={handleEmojiInsert}
            className="p-1 text-[#64748B] hover:text-[#334155]"
            title="Insert Emoji"
          >
            <SmileIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Editor content area */}
      <div className="w-full min-h-[272px] px-6 py-4">
        <EditorContent
          editor={editor}
          className="outline-none w-full h-full min-h-[240px] text-slate-700 text-[16px] leading-[20px] font-['DM_Sans']"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
