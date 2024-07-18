import { faIcons } from "../custom components/faIcons";
import React, { useState } from "react";
import CustomDropdown from "../custom components/CustomDropdown";
import { mdiIcons } from "../custom components/mdiIcons";
import SearchableFontDropdown from "../custom components/SearchableFontDropdown";
import { CardElement, ColorPattern } from "../types";
import {
  ChevronLeft,
  ChevronRight,
  Layout,
  Image,
  Type,
  Square,
  QrCode,
  Plus,
  Trash2,
} from "lucide-react";

interface CardEditorProps {
  elements: CardElement[];
  backgroundImage: string | null;
  backgroundColor: string;
  overlayColor: string;
  overlayOpacity: number;
  addElement: (type: CardElement["type"]) => void;
  updateElement: (id: string, props: Partial<CardElement["props"]>) => void;
  deleteElement: (id: string) => void;
  setState: (action: any) => void;
  undo: () => void;
  redo: () => void;
  selectedElement: string | null;
  setSelectedElement: (id: string | null) => void;
  colorPattern: ColorPattern;
  updateLogoScale: (scale: number) => void;
}

const ElementEditor: React.FC<{
  element: CardElement;
  updateElement: Function;
  deleteElement: Function;
  updateLogoScale: Function;
}> = ({ element, updateElement, deleteElement, updateLogoScale }) => {
  const handleChange = (key: string, value: any) => {
    updateElement(element.id, { [key]: value });
  };
  const [activeSection, setActiveSection] = useState<
    "text" | "icon" | "style" | "shadow"
  >("text");

  const renderIconSection = () => (
    <>
      <CustomDropdown
        icons={[...faIcons, ...mdiIcons]}
        onChange={(icon) => handleChange("icon", icon)}
        iconSize={element.props.iconSize || element.props.fontSize || 16}
        iconColor={element.props.iconColor || element.props.color || "#000000"}
      />
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Icon Size
        </label>
        <input
          type="number"
          min="8"
          max="72"
          value={element.props.iconSize || element.props.fontSize || 16}
          onChange={(e) => handleChange("iconSize", Number(e.target.value))}
          className="w-full px-4 py-2 text-gray-700 bg-white border-b-4 border-separate focus:outline-none"
        />
        <span className="text-sm text-gray-600">
          {element.props.iconSize || element.props.fontSize || 16}px
        </span>
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Icon Color
        </label>
        <input
          type="color"
          value={element.props.iconColor || element.props.color || "#000000"}
          onChange={(e) => handleChange("iconColor", e.target.value)}
          className="w-full h-10 p-0 border-none cursor-pointer"
        />
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Icon Position
        </label>
        <div className="flex space-x-2">
          <button
            onClick={() => handleChange("iconPosition", "left")}
            className={`px-4 py-2 text-sm font-medium ${
              element.props.iconPosition !== "right"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Left
          </button>
          <button
            onClick={() => handleChange("iconPosition", "right")}
            className={`px-4 py-2 text-sm font-medium ${
              element.props.iconPosition === "right"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Right
          </button>
        </div>
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Icon Spacing
        </label>
        <input
          type="number"
          min="0"
          max="50"
          value={element.props.iconSpacing || 0}
          onChange={(e) => handleChange("iconSpacing", Number(e.target.value))}
          className="w-full px-4 py-2 text-gray-700 bg-white border-b-4 border-separate focus:outline-none"
        />
        <span className="text-sm text-gray-600">
          {element.props.iconSpacing || 0}px
        </span>
      </div>
    </>
  );

  const renderTextSection = () => (
    <>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Text Content
        </label>
        <input
          type="text"
          value={element.props.content}
          onChange={(e) => handleChange("content", e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Font Family
        </label>
        <SearchableFontDropdown
          fonts={[
            "Arial",
            "Verdana",
            "Helvetica",
            "Tahoma",
            "Trebuchet MS",
            "Times New Roman",
            "Georgia",
            "Garamond",
            "Courier New",
            "Brush Script MT",
            "Lobster",
            "Pacifico",
            "Roboto",
            "Montserrat",
            "Open Sans",
            "Playfair Display",
            "Merriweather",
            "Roboto Slab",
            "BlackJackRegular",
          ]}
          fontFamily={element.props.fontFamily || "Arial"}
          setFontFamily={(font) => handleChange("fontFamily", font)}
        />
      </div>
    </>
  );

  const renderStyleSection = () => (
    <>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Font Size
        </label>
        <input
          type="number"
          min="8"
          max="72"
          value={element.props.fontSize || 16}
          onChange={(e) => handleChange("fontSize", Number(e.target.value))}
          className="w-full px-4 py-2 text-gray-700 bg-white border-b-4 border-separate focus:outline-none"
        />
        <span className="text-sm text-gray-600">
          {element.props.fontSize || 16}px
        </span>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Color
        </label>
        <input
          type="color"
          value={element.props.color || "#000000"}
          onChange={(e) => handleChange("color", e.target.value)}
          className="w-full h-10 p-0 border-none cursor-pointer"
        />
      </div>
      <div className="mb-4 grid grid-cols-3 gap-2">
        <button
          onClick={() =>
            handleChange(
              "fontWeight",
              element.props.fontWeight === "bold" ? "normal" : "bold"
            )
          }
          className={`py-2 text-sm font-medium transition duration-200 ${
            element.props.fontWeight === "bold"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Bold
        </button>
        <button
          onClick={() =>
            handleChange(
              "fontStyle",
              element.props.fontStyle === "italic" ? "normal" : "italic"
            )
          }
          className={`py-2 text-sm font-medium transition duration-200 ${
            element.props.fontStyle === "italic"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Italic
        </button>
        <button
          onClick={() =>
            handleChange(
              "textDecoration",
              element.props.textDecoration === "underline"
                ? "none"
                : "underline"
            )
          }
          className={`py-2 text-sm font-medium transition duration-200 ${
            element.props.textDecoration === "underline"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Underline
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Letter Spacing
        </label>
        <input
          type="number"
          min="0"
          max="20"
          value={element.props.letterSpacing || 0}
          onChange={(e) =>
            handleChange("letterSpacing", Number(e.target.value))
          }
          className="w-full px-4 py-2 text-gray-700 bg-white border-b-4 border-separate focus:outline-none"
        />
        <span className="text-sm text-gray-600">
          {element.props.letterSpacing || 0}px
        </span>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Rotation
        </label>
        <input
          type="number"
          min="0"
          max="360"
          value={element.props.rotation || 0}
          onChange={(e) => handleChange("rotation", Number(e.target.value))}
          className="w-full px-4 py-2 text-gray-700 bg-white border-b-4 border-separate focus:outline-none"
        />
        <span className="text-sm text-gray-600">
          {element.props.rotation || 0}°
        </span>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Opacity
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={(element.props.opacity || 1) * 100}
          onChange={(e) =>
            handleChange("opacity", Number(e.target.value) / 100)
          }
          className="w-full px-4 py-2 text-gray-700 bg-white border-b-4 border-separate focus:outline-none"
        />
        <span className="text-sm text-gray-600">
          {Math.round((element.props.opacity || 1) * 100)}%
        </span>
      </div>
    </>
  );

  const renderShadowSection = () => (
    <>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Shadow Offset X
        </label>
        <input
          type="number"
          min="-50"
          max="50"
          value={element.props.offsetX || 0}
          onChange={(e) => handleChange("offsetX", Number(e.target.value))}
          className="w-full px-4 py-2 text-gray-700 bg-white border-b-4 border-separate focus:outline-none"
        />
        <span className="text-sm text-gray-600">
          {element.props.offsetX || 0}px
        </span>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Shadow Offset Y
        </label>
        <input
          type="number"
          min="-50"
          max="50"
          value={element.props.offsetY || 0}
          onChange={(e) => handleChange("offsetY", Number(e.target.value))}
          className="w-full px-4 py-2 text-gray-700 bg-white border-b-4 border-separate focus:outline-none"
        />
        <span className="text-sm text-gray-600">
          {element.props.offsetY || 0}px
        </span>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Shadow Blur
        </label>
        <input
          type="number"
          min="0"
          max="30"
          value={element.props.blur || 0}
          onChange={(e) => handleChange("blur", Number(e.target.value))}
          className="w-full px-4 py-2 text-gray-700 bg-white border-b-4 border-separate focus:outline-none"
        />
        <span className="text-sm text-gray-600">
          {element.props.blur || 0}px
        </span>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Shadow Color
        </label>
        <input
          type="color"
          value={element.props.offsetColor || "#000000"}
          onChange={(e) => handleChange("offsetColor", e.target.value)}
          className="w-full h-10 p-0 border-none cursor-pointer"
        />
      </div>
      <button
        onClick={() => {
          handleChange("offsetX", 0);
          handleChange("offsetY", 0);
          handleChange("blur", 0);
          handleChange("offsetColor", "transparent");
        }}
        className="w-full py-2 bg-red-500 text-white hover:bg-red-600 transition duration-200"
      >
        Turn Off Shadow
      </button>
    </>
  );

  const renderQRCodeSection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          QR Code Content
        </label>
        <input
          type="text"
          value={element.props.content}
          onChange={(e) => handleChange("content", e.target.value)}
          className="w-full p-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-600 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          QR Code Color
        </label>
        <input
          type="color"
          value={element.props.color || "#000000"}
          onChange={(e) => handleChange("color", e.target.value)}
          className="w-full h-12 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          QR Code Background
        </label>
        <input
          type="color"
          value={element.props.qrBackground || "#ffffff"}
          onChange={(e) => handleChange("qrBackground", e.target.value)}
          className="w-full h-12 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        />
      </div>
      <div>
        <button
          onClick={() =>
            handleChange(
              "qrBackground",
              element.props.qrBackground === "transparent"
                ? "#ffffff"
                : "transparent"
            )
          }
          className="w-full py-2 px-4 bg-gray-50 text-indigo-600 hover:bg-gray-100 transition-colors duration-200 text-sm font-medium focus:outline-none"
        >
          {element.props.qrBackground === "transparent"
            ? "Set White Background"
            : "Set Transparent Background"}
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          QR Code Size
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="50"
            max="200"
            value={element.props.size || 100}
            onChange={(e) => handleChange("size", Number(e.target.value))}
            className="w-full p-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-600 focus:outline-none"
          />
          <span className="text-sm text-gray-600 whitespace-nowrap">
            {element.props.size || 100}px
          </span>
        </div>
      </div>
    </div>
  );

  const renderShapeSection = () => (
    <>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Shape Color
          </label>
          <input
            type="color"
            value={element.props.color || "#000000"}
            onChange={(e) => handleChange("color", e.target.value)}
            className="w-full h-12 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Shape Size
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="10"
              max="200"
              value={element.props.size || 100}
              onChange={(e) => handleChange("size", Number(e.target.value))}
              className="w-full p-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-600 focus:outline-none"
            />
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {element.props.size || 100}px
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Border Radius
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              max="100"
              value={element.props.borderRadius || 0}
              onChange={(e) =>
                handleChange("borderRadius", Number(e.target.value))
              }
              className="w-full p-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-600 focus:outline-none"
            />
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {element.props.borderRadius || 0}px
            </span>
          </div>
        </div>
      </div>
    </>
  );

  const renderImageSection = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                const imageDataUrl = reader.result as string;
                handleChange("src", imageDataUrl);
              };
              reader.readAsDataURL(file);
            }
          }}
          className="w-full p-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-600 focus:outline-none"
        />
      </div>

      {element.props.src ? (
        <div>
          <img
            src={element.props.src}
            alt="Uploaded image"
            className="w-full h-auto mb-2"
          />
          <button
            onClick={() => handleChange("src", null)}
            className="w-full py-2 px-4 bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Remove Image
          </button>
        </div>
      ) : (
        <p className="text-sm text-gray-600">
          No image uploaded yet. Please upload an image.
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Image Size
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="10"
            max="200"
            value={element.props.size || 100}
            onChange={(e) => handleChange("size", Number(e.target.value))}
            className="w-full p-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-600 focus:outline-none"
          />
          <span className="text-sm text-gray-600 whitespace-nowrap">
            {element.props.size || 100}px
          </span>
        </div>
      </div>
    </div>
  );
  const renderLogoSection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-700">Logo Size</h3>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Scale
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="10"
            max="200"
            step="10"
            value={((element.props.scale || 1) * 100).toFixed(0)}
            onChange={(e) => {
              const newScale = Number(e.target.value) / 100;
              updateElement(element.id, { scale: newScale });
              updateLogoScale(newScale);
            }}
            className="w-full p-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-600 focus:outline-none"
          />
          <span className="text-sm text-gray-600 whitespace-nowrap">%</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {element.type === "logo" ? (
        renderLogoSection()
      ) : element.type === "text" ? (
        <>
          <div className="flex mb-6">
            <button
              onClick={() => setActiveSection("text")}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                activeSection === "text"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-indigo-700 hover:bg-gray-300"
              }`}
            >
              Text
            </button>
            <button
              onClick={() => setActiveSection("icon")}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                activeSection === "icon"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-indigo-700 hover:bg-gray-300"
              }`}
            >
              Icon
            </button>
            <button
              onClick={() => setActiveSection("style")}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                activeSection === "style"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-indigo-700 hover:bg-gray-300"
              }`}
            >
              Style
            </button>
            <button
              onClick={() => setActiveSection("shadow")}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 ${
                activeSection === "shadow"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-indigo-700 hover:bg-gray-300"
              }`}
            >
              Shadow
            </button>
          </div>

          {activeSection === "text" && renderTextSection()}
          {activeSection === "icon" && renderIconSection()}
          {activeSection === "style" && renderStyleSection()}
          {activeSection === "shadow" && renderShadowSection()}
        </>
      ) : element.type === "qrcode" ? (
        renderQRCodeSection()
      ) : element.type === "shape" ? (
        renderShapeSection()
      ) : element.type === "image" ? (
        renderImageSection()
      ) : null}

      <button
        onClick={() => deleteElement(element.id)}
        className="w-full py-2 px-4 bg-red-400 text-white hover:bg-red-500 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Delete Element
      </button>
    </div>
  );
};

const CardEditor: React.FC<CardEditorProps> = ({
  elements,
  backgroundImage,
  backgroundColor,
  overlayColor,
  overlayOpacity,
  addElement,
  updateElement,
  deleteElement,
  setState,
  undo,
  redo,
  selectedElement,
  setSelectedElement,
  colorPattern,
  updateLogoScale,
}) => {
  const [activeTab, setActiveTab] = useState("elements");

  const handleBackgroundImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        setState((prevState: any) => ({
          ...prevState,
          backgroundImage: imageDataUrl,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderBackgroundEditor = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Background Color
        </label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) =>
            setState((prevState: any) => ({
              ...prevState,
              backgroundColor: e.target.value,
            }))
          }
          className="w-full h-12 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Upload Background Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundImageUpload}
          className="w-full p-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-600 focus:outline-none"
        />
      </div>

      {backgroundImage && (
        <div>
          <button
            onClick={() =>
              setState((prevState: any) => ({
                ...prevState,
                backgroundImage: null,
              }))
            }
            className="w-full py-2 px-4 bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Remove Background Image
          </button>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Overlay Color
        </label>
        <input
          type="color"
          value={overlayColor}
          onChange={(e) =>
            setState((prevState: any) => ({
              ...prevState,
              overlayColor: e.target.value,
            }))
          }
          className="w-full h-12 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Overlay Opacity
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="0"
            max="100"
            value={overlayOpacity}
            onChange={(e) =>
              setState((prevState: any) => ({
                ...prevState,
                overlayOpacity: Number(e.target.value),
              }))
            }
            className="w-full p-2 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 text-sm text-gray-600 focus:outline-none"
          />
          <span className="text-sm text-gray-600">%</span>
        </div>
      </div>
    </div>
  );
  const elementTypes = [
    { type: "text", icon: Type, label: "Text" },
    { type: "image", icon: Image, label: "Image" },
    { type: "shape", icon: Square, label: "Shape" },
    { type: "qrcode", icon: QrCode, label: "QR Code" },
    { type: "logo", icon: Plus, label: "Logo" },
  ];
  return (
    <div className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-3">
        <button
          onClick={undo}
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200 focus:outline-none"
        >
          Undo
        </button>
        <button
          onClick={redo}
          className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200 focus:outline-none"
        >
          Redo
        </button>
      </div>
      <div className="">
        <div className="flex mb-8">
          {["elements", "background"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-6 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "elements" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {elementTypes.map((el) => (
                <button
                  key={el.type}
                  onClick={() => addElement(el.type as CardElement["type"])}
                  className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex flex-col items-center justify-center focus:outline-none"
                >
                  <el.icon size={24} className="text-gray-600 mb-2" />
                  <span className="text-sm text-gray-600">{el.label}</span>
                </button>
              ))}
            </div>
            {selectedElement && (
              <div className="mt-6 pt-6">
                {elements.find((el) => el.id === selectedElement) ? (
                  <ElementEditor
                    element={elements.find((el) => el.id === selectedElement)!}
                    updateElement={updateElement}
                    deleteElement={deleteElement}
                    updateLogoScale={updateLogoScale}
                  />
                ) : (
                  <p className="text-gray-600">
                    No element selected. Please select an element to edit.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === "background" && renderBackgroundEditor()}
      </div>
    </div>
  );
};

export default CardEditor;
