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
  Trash2,
  MoreVertical,
} from "lucide-react";
import { UploadErrorToast } from "./ui/upload-error-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

  const [uploadedImages, setUploadedImages] = useState<
    Array<{
      url: string;
      name: string;
    }>
  >([]);

  const [showUploadFailToast, setShowUploadFailToast] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
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

  const handleHeadingChange = (level: Level) => {
    editor?.chain().focus().toggleHeading({ level }).run();
    setCurrentHeadingLevel(level);
    setShowHeadingDropdown(false);
  };

  const getHeadingText = () => {
    return `Heading ${currentHeadingLevel}`;
  };

  useEffect(() => {
    if (editor) {
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
        .ProseMirror .image-card {
          background-color: #EFF6FF;
          padding: 16px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 8px 0;
          cursor: default;
          user-select: none;
        }
        .ProseMirror .file-name {
          color: #334155;
          font-size: 16px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }
        .ProseMirror .delete-btn {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ProseMirror .delete-btn:hover {
          opacity: 0.8;
        }
        .ProseMirror .image-uploader {
          background-color: #F1F5F9;
          border: 1px solid #CBD5E1;
          padding: 8px 12px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 438px;
          height: 177px;
          position: relative;
          margin: 8px 0;
          cursor: default;
          user-select: none;
        }
        .ProseMirror .image-uploader .file-name {
          color: #334155;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
        }
        .ProseMirror .image-uploader img {
          max-width: 350px;
          max-height: 120px;
          object-fit: contain;
        }
        .ProseMirror .uploader-container {
          margin: 8px 0;
        }
        .ProseMirror .resume-uploader {
          background-color: #F1F5F9;
          border: 1px solid #CBD5E1;
          border-radius: 4px;
          width: 438px;
          height: 177px;
          position: relative;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .ProseMirror .resume-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ProseMirror .resume-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60A5FA;
        }
        .ProseMirror .resume-filename {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }
        .ProseMirror .resume-delete {
          color: #EF4444;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ProseMirror .resume-delete:hover {
          opacity: 0.8;
        }
        .ProseMirror .resume-image {
          position: absolute;
          left: 44px;
          top: 40px;
          width: 350px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ProseMirror .resume-image img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .ProseMirror .image-preview-container {
          margin: 8px 0;
        }
        
        .ProseMirror .image-preview-box {
          background-color: #EFF6FF;
          border-radius: 4px;
          width: 100%;
          position: relative;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        
        .ProseMirror .image-preview-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .ProseMirror .image-preview-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #60A5FA;
        }
        
        .ProseMirror .image-preview-filename {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #334155;
        }
        
        .ProseMirror .image-preview-delete {
          color: #EF4444;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .ProseMirror .image-preview-delete:hover {
          opacity: 0.8;
        }
        
        .ProseMirror .image-preview-content {
          padding-top: 12px;
          width: 100%;
          display: flex;
          justify-content: center;
        }
        
        .ProseMirror .image-preview-content img {
          max-width: 100%;
          max-height: 150px;
          object-fit: contain;
          border: 1px solid #CBD5E1;
          background-color: #F8FAFC;
          padding: 4px;
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

  const handleImageInsert = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;

    input.onchange = (event) => {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length > 0) {
        if (uploadedImages.length + files.length > 3) {
          setShowUploadFailToast(true);
          return;
        }

        const newImages = Array.from(files).map((file) => {
          const imageUrl = URL.createObjectURL(file);

          let fileName = file.name;

          if (fileName.length > 50) {
            const extension = fileName.split(".").pop() || "";
            fileName = `image_${Date.now()}.${extension}`;
          }

          return {
            url: imageUrl,
            name: fileName,
          };
        });

        setUploadedImages((prev) => [...prev, ...newImages]);
      }
    };

    input.click();
  };

  const handleLinkInsert = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleVideoInsert = () => {
    const url = window.prompt("Enter video URL (YouTube, Vimeo, etc.)");
    if (!url) return;

    let videoId = "";
    let embedHtml = "";

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
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

    const closeOnClickOutside = (e: MouseEvent) => {
      if (!container.contains(e.target as Node)) {
        document.body.removeChild(container);
        document.removeEventListener("mousedown", closeOnClickOutside);
      }
    };

    document.addEventListener("mousedown", closeOnClickOutside);
  };

  const toolbarButtons = [
    {
      icon: <BoldIcon className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      title: "Bold",
    },
    {
      icon: <ItalicIcon className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      title: "Italic",
    },
    {
      icon: <UnderlineIcon className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
      title: "Underline",
    },
    {
      icon: <StrikethroughIcon className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      title: "Strikethrough",
    },
    {
      icon: <AlignLeft className="w-5 h-5" />,
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph"),
      title: "Paragraph",
    },
    {
      icon: <ListIcon className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      title: "Bullet List",
    },
    {
      icon: <ListOrderedIcon className="w-5 h-5" />,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      title: "Numbered List",
    },
    {
      icon: <LinkIcon className="w-5 h-5" />,
      action: handleLinkInsert,
      isActive: editor.isActive("link"),
      title: "Insert Link",
    },
    {
      icon: <ImageIcon className="w-5 h-5" />,
      action: handleImageInsert,
      isActive: editor.isActive("image"),
      title: "Insert Image",
    },
    {
      icon: <VideoIcon className="w-5 h-5" />,
      action: handleVideoInsert,
      isActive: false,
      title: "Insert Video",
    },
    {
      icon: <SmileIcon className="w-5 h-5" />,
      action: handleEmojiInsert,
      isActive: false,
      title: "Insert Emoji",
    },
  ];

  return (
    <div
      className={`w-full rounded-md border ${
        isFocused
          ? "border-slate-700 ring-1 ring-slate-700"
          : "border-[#CBD5E1]"
      } bg-[#F8FAFC] overflow-hidden transition-colors ${className}`}
    >
      {/* Toast for failed upload */}
      <UploadErrorToast
        show={showUploadFailToast}
        onHide={() => setShowUploadFailToast(false)}
      />

      {/* Text formatting toolbar - responsive design */}
      <div className="flex items-center px-3 sm:px-6 py-3 border-b border-[#E2E8F0]">
        <div className="flex items-center w-full justify-between">
          {/* Heading selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowHeadingDropdown(!showHeadingDropdown)}
              className="flex items-center gap-2 sm:gap-8"
            >
              <span className="text-sm sm:text-base font-semibold text-[#64748B]">
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

          {/* Desktop toolbar buttons */}
          <div className="hidden sm:flex items-center justify-between flex-1 ml-4">
            {toolbarButtons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className={`p-1 ${
                  button.isActive ? "text-[#334155]" : "text-[#64748B]"
                } hover:text-[#334155]`}
                title={button.title}
              >
                {button.icon}
              </button>
            ))}
          </div>

          {/* Mobile toolbar popover */}
          <div className="sm:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <button className="p-2 text-[#64748B] hover:text-[#334155]">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2 grid grid-cols-4 gap-1">
                {toolbarButtons.map((button, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      button.action();
                    }}
                    className={`p-2 rounded hover:bg-slate-100 ${
                      button.isActive ? "text-[#334155]" : "text-[#64748B]"
                    }`}
                    title={button.title}
                  >
                    {button.icon}
                  </button>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Editor content area */}
      <div className="w-full min-h-[272px] px-3 sm:px-6 py-4">
        <EditorContent
          editor={editor}
          className="outline-none w-full h-full min-h-[240px] text-slate-700 text-[16px] leading-[20px] font-['DM_Sans']"
        />
      </div>

      {/* Display uploaded images below the editor */}
      {uploadedImages.length > 0 && (
        <div className="px-3 sm:px-6 pb-4 flex flex-col sm:flex-wrap sm:flex-row gap-4">
          {uploadedImages.map((image, index) => (
            <div
              key={index}
              className="bg-[#F1F5F9] border border-[#CBD5E1] rounded-md p-3 w-full sm:w-[438px] h-[177px] relative overflow-hidden"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="text-[#60A5FA]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z"
                        fill="#60A5FA"
                      />
                    </svg>
                  </div>
                  <span className="text-[#334155] text-[14px] font-semibold font-['DM Sans'] truncate max-w-[200px] sm:max-w-[320px]">
                    {image.name.length > 35
                      ? image.name.substring(0, 32) + "..."
                      : image.name}
                  </span>
                </div>
                <button
                  className="text-[#EF4444]"
                  onClick={() =>
                    setUploadedImages((prev) =>
                      prev.filter((_, i) => i !== index),
                    )
                  }
                >
                  <Trash2
                    size={24}
                    className="text-[#EF4444] stroke-[1.5px] fill-none"
                  />
                </button>
              </div>
              <div className="absolute left-[44px] top-[40px] w-[calc(100%-88px)] sm:w-auto">
                <img
                  src={image.url}
                  alt={image.name}
                  className="max-w-full sm:max-w-[350px] max-h-[120px] object-contain bg-white p-1 rounded border border-[#E2E8F0]"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
