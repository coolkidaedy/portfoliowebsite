import { useEffect, useRef, useState } from "react";
import { serif } from "@/lib/academicStyle";

// Photo cards: date + location are burned into the bottom corners of the
// photo, with a neutral frame behind it — both stay hidden until the card
// is hovered, so the gallery reads as plain photos at rest. Laid out as a
// Pinterest-style masonry so photos keep their natural aspect ratio and
// pack together without forced cropping. Add more entries here (and drop
// files into public/assets) to grow the gallery. `rank` controls display
// order left-to-right, top-to-bottom (lower rank shows first, filling
// across columns before wrapping to the next row) — edit the numbers to
// reorder the gallery.
const photos = [
  {
    src: "/assets/A8A5314F-FA34-4462-B5C5-6BB0FECE290F_1_105_c.jpeg",
    rank: 1,
    date: "MAY 19, 2024",
    location: "El Paso, TX",
    caption: "Cousin's Quinceañera",
  },
  {
    src: "/assets/0DF94D31-DE2E-4F05-88DA-01FBA54131F4_1_105_c.jpeg",
    rank: 2,
    date: "MAY 20, 2024",
    location: "Powell, OH",
    caption: "Pereira's Pentola (my backyard restaurant)",
  },
  {
    src: "/assets/4518BFCE-967B-42B0-8C3D-96EAEFBEB94E_1_105_c.jpeg",
    rank: 3,
    date: "JUL 14, 2024",
    location: "Bamburger Ranch",
    caption: "My math campers (family 1)",
  },
  {
    src: "/assets/DBC7329B-BC53-423B-9501-E33FC219A088.jpeg",
    rank: 4,
    date: "APR 16, 2026",
    location: "New York, NY",
    caption: "My roommates & I",
  },
  {
    src: "/assets/6A446508-1704-402C-A203-BEE847316FC1_1_105_c.jpeg",
    rank: 5,
    date: "MAY 2, 2026",
    location: "New York, NY",
    caption: "Frat Cruise",
  },
  {
    src: "/assets/5D7B5DD9-C10C-4FA4-8C2D-BC050C977748_1_105_c.jpeg",
    rank: 10,
    date: "DEC 2, 2024",
    location: "Columbus, OH",
    caption: "Ohio State vs Michigan",
  },
  {
    src: "/assets/A0DA2C64-71BA-4816-8EA6-3B77A7641A77_1_105_c.jpeg",
    rank: 7,
    date: "AUG 12, 2024",
    location: "Costa Rica",
    caption: "My family",
  },
  {
    src: "/assets/46438FAA-887E-4F02-91A5-2FE2C2A7A250_1_105_c.jpeg",
    rank: 8,
    date: "JUN 28, 2026",
    location: "Los Angeles, CA",
    caption: "LA trip",
  },
  {
    src: "/assets/27163AEE-C804-4DD7-9944-D8397C7B259B_1_105_c.jpeg",
    rank: 9,
    date: "DEC 24, 2025",
    location: "Morocco",
    caption: "My sister",
  },
  {
    src: "/assets/DA0E07C9-16CD-4FE2-B8F4-EC127E91F9FA_1_105_c.jpeg",
    rank: 23,
    date: "MAR 12, 2025",
    location: "Columbia",
    caption: "Ohio friends visit Columbia",
  },
  {
    src: "/assets/D5E4037E-808A-42A1-B1E3-2EC69B7A2A5E_1_105_c.jpeg",
    rank: 11,
    date: "AUG 23, 2025",
    location: "Columbus, OH",
    caption: "Ohio State visit",
  },
  {
    src: "/assets/2B58106E-A55C-4DE2-9BF0-A0A09201C797_1_105_c.jpeg",
    rank: 12,
    date: "JUN 25, 2022",
    location: "San Marcos, TX",
    caption: "Laundy with roommate at HSMC",
  },
  {
    src: "/assets/EC9CDE5F-98A7-471E-9A53-B8382C159EC8_1_105_c.jpeg",
    rank: 13,
    date: "JUN 9, 2024",
    location: "Powell, OH",
    caption: "Grad Party",
  },
  {
    src: "/assets/D2602D65-8AF4-4B29-B828-74AFFA19BFC3_1_105_c.jpeg",
    rank: 14,
    date: "JUN 10, 2016",
    location: "Europe trip",
    caption: "Europe trip with family",
  },
  {
    src: "/assets/A9E2CC97-DAF0-48B2-9078-10E955A2AC69_1_105_c.jpeg",
    rank: 15,
    date: "FEB 19, 2023",
    location: "Princeton, NJ",
    caption: "Princeton visit with sister and her boyfriend",
  },
  {
    src: "/assets/73B711C1-BEFE-4616-8795-0BACC67D15BD_1_105_c.jpeg",
    rank: 16,
    date: "NOV 27, 2022",
    location: "Toronto, ON",
    caption: "Dinner with family",
  },
  {
    src: "/assets/A52C9098-18AF-4168-A920-E076728DA731_1_105_c.jpeg",
    rank: 17,
    date: "JAN 25, 2025",
    location: "Boston, MA",
    caption: "Boston with math camp friends",
  },
  {
    src: "/assets/DDB7FB29-C220-4634-8411-F63842257132_1_105_c.jpeg",
    rank: 18,
    date: "APR 8, 2026",
    location: "New York, NY",
    caption: "IM basketball playoff win",
  },
  {
    src: "/assets/A2844754-B352-4588-B83F-850E4653B26A_1_105_c.jpeg",
    rank: 19,
    date: "DEC 15, 2024",
    location: "New York, NY",
    caption: "NYC view",
  },
  {
    src: "/assets/3854EA06-9C01-4FB2-85B0-0C08B87CBB34_1_105_c.jpeg",
    rank: 20,
    date: "AUG 14, 2024",
    location: "Costa Rica",
    caption: "Costa Rica trip with family",
  },
  {
    src: "/assets/3B043FEE-C046-4FA4-8531-F9E4F6CA37C4_1_105_c.jpeg",
    rank: 21,
    date: "APR 26, 2026",
    location: "New York, NY",
    caption: "CORE senior night",
  },
  {
    src: "/assets/6A11D5A3-7B0D-4B20-AAD5-12EDA62B657A_1_105_c.jpeg",
    rank: 22,
    date: "FEB 9, 2024",
    location: "Powell, OH",
    caption: "Aarin's Surprise Birthday Party",
  },
  {
    src: "/assets/D9489989-1D05-466E-919F-CC2909F430F6_1_105_c.jpeg",
    rank: 6,
    date: "AUG 31, 2024",
    location: "New York, NY",
    caption: "Sister's Birthday",
  },
  {
    src: "/assets/22E9762E-6B33-402E-BA6B-F0EFAA26F75C_1_105_c.jpeg",
    rank: 25,
    date: "JUN 2, 2024",
    location: "Powell, OH",
    caption: "High school friends",
  },
  {
    src: "/assets/AA0E8B8A-1259-4BF9-A5FD-489D423AA853_1_105_c.jpeg",
    rank: 26,
    date: "JUL 25, 2025",
    location: "Dublin, OH",
    caption: "Grad Party",
  },
  {
    src: "/assets/E22A62ED-BD7B-41CD-979E-3D63FBA550A1_1_105_c.jpeg",
    rank: 24,
    date: "AUG 1, 2024",
    location: "Powell, OH",
    caption: "Grad Party",
  },
];

const COLUMN_WIDTH = 240;
const COLUMN_GAP = 20;

const PhotoCard = ({ photo, onClick }) => (
  <div className="group" style={{ marginBottom: "20px" }}>
    <div
      className="bg-transparent group-hover:bg-[#f2f0eb] transition-colors duration-300 cursor-pointer"
      style={{ padding: "10px 10px 12px" }}
      onClick={onClick}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={photo.src}
          alt={photo.caption}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
        <span
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            position: "absolute",
            left: "8px",
            bottom: "8px",
            fontFamily: "'Courier New', monospace",
            fontSize: "11px",
            letterSpacing: "0.05em",
            color: "#fff",
            textShadow: "0 1px 2px rgba(0,0,0,0.6)",
          }}
        >
          {photo.date}
        </span>
        <span
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            position: "absolute",
            right: "8px",
            bottom: "8px",
            fontFamily: "'Courier New', monospace",
            fontSize: "11px",
            letterSpacing: "0.05em",
            color: "#fff",
            textShadow: "0 1px 2px rgba(0,0,0,0.6)",
          }}
        >
          {photo.location}
        </span>
      </div>
    </div>
    <p
      className="mt-1"
      style={{ fontSize: "13px", fontStyle: "italic", color: "#555", padding: "0 10px" }}
    >
      {photo.caption}
    </p>
  </div>
);

const Lightbox = ({ photo, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.85)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        cursor: "zoom-out",
      }}
    >
      <img
        src={photo.src}
        alt={photo.caption}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "100%",
          maxHeight: "80vh",
          objectFit: "contain",
          cursor: "default",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        }}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: "16px",
          textAlign: "center",
          color: "#fff",
          fontFamily: serif,
          cursor: "default",
        }}
      >
        <p style={{ fontStyle: "italic", fontSize: "15px" }}>{photo.caption}</p>
        <p
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "12px",
            letterSpacing: "0.05em",
            color: "#ccc",
            marginTop: "4px",
          }}
        >
          {photo.date} · {photo.location}
        </p>
      </div>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "fixed",
          top: "20px",
          right: "24px",
          color: "#fff",
          fontSize: "28px",
          lineHeight: 1,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
};

// Estimates a card's rendered height at the current column width so columns
// can be balanced instead of just alternated — otherwise columns with
// taller photos end up noticeably longer than the others, leaving an
// uneven, ragged bottom edge to the gallery.
const estimateCardHeight = (photo, aspectRatio) => {
  const imageWidth = COLUMN_WIDTH - 20; // frame padding: 10px each side
  const imageHeight = imageWidth / aspectRatio;
  const captionLines = Math.max(1, Math.ceil(photo.caption.length / 30));
  const captionHeight = captionLines * 16 + 4;
  return 22 + imageHeight + captionHeight + 20; // frame vertical padding + margin-bottom
};

export const Pictures = () => {
  const containerRef = useRef(null);
  const [columnCount, setColumnCount] = useState(1);
  const [aspectRatios, setAspectRatios] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateColumnCount = () => {
      const width = el.offsetWidth;
      const count = Math.max(1, Math.floor((width + COLUMN_GAP) / (COLUMN_WIDTH + COLUMN_GAP)));
      setColumnCount(count);
    };

    updateColumnCount();
    const observer = new ResizeObserver(updateColumnCount);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    photos.forEach((photo) => {
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        setAspectRatios((prev) =>
          prev[photo.src]
            ? prev
            : { ...prev, [photo.src]: img.naturalWidth / img.naturalHeight }
        );
      };
      img.src = photo.src;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const sorted = [...photos].sort((a, b) => a.rank - b.rank);
  const columns = Array.from({ length: columnCount }, () => []);
  const columnHeights = Array(columnCount).fill(0);
  sorted.forEach((photo) => {
    const aspectRatio = aspectRatios[photo.src] || 1;
    const shortest = columnHeights.indexOf(Math.min(...columnHeights));
    columns[shortest].push(photo);
    columnHeights[shortest] += estimateCardHeight(photo, aspectRatio);
  });

  return (
    <section
      id="pictures"
      className="px-5 py-4"
      style={{ fontFamily: serif, color: "#000", fontSize: "16px", textAlign: "left" }}
    >
      <h2 className="font-bold mb-1" style={{ fontSize: "24px" }}>
        Pictures
      </h2>
      <p className="mb-3" style={{ fontSize: "13px", fontStyle: "italic", color: "#555" }}>
        Click to enlarge.
      </p>
      <div ref={containerRef} style={{ display: "flex", gap: `${COLUMN_GAP}px` }}>
        {columns.map((column, i) => (
          <div key={i} style={{ flex: 1, minWidth: 0 }}>
            {column.map((photo) => (
              <PhotoCard key={photo.src} photo={photo} onClick={() => setSelectedPhoto(photo)} />
            ))}
          </div>
        ))}
      </div>
      {selectedPhoto && <Lightbox photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />}
    </section>
  );
};
