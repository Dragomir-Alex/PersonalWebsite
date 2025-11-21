import React from "react";
import duckImg from "../assets/images/duck.png";
import lineImg from "../assets/images/line.png";

const BackgroundPattern = ({
  duckSize = 60,
  duckMargin = 30,
  lineSize = 40,
  gapX = 180,
  gapY = 60,
  className = "",
}) => {
  const tileSizeX = duckSize + gapX;
  const tileSizeY = duckSize + gapY;

  const duckX = gapX / 2;
  const duckY = gapY / 2;

  const line1X = duckX - duckMargin - lineSize / 2;
  const line1Y = duckY - duckMargin - lineSize / 2;

  const line2X = duckX + duckMargin + duckSize - lineSize / 2;
  const line2Y = duckY - duckMargin - lineSize / 2;

  const rowOffset = tileSizeX / 2;

  const renderImage = (
    href,
    baseX,
    baseY,
    width,
    height,
    opacity = 1,
    flipConfig = false,
    enableRockingAnim = false
  ) => {
    const elements = [];
    const totalHeight = tileSizeY * 2;

    const rows = [
      { x: baseX, y: baseY },
      { x: baseX + rowOffset, y: baseY + tileSizeY },
    ];

    rows.forEach((row, rowIndex) => {
      const isFlipped =
        typeof flipConfig === "function" ? flipConfig(rowIndex) : flipConfig;

      let drawX = row.x % tileSizeX; // normalize X
      if (drawX < 0) drawX += tileSizeX;

      let drawY = row.y % totalHeight; // normalize Y
      if (drawY < 0) drawY += totalHeight;

      const xPositions = [drawX];
      if (drawX + width > tileSizeX) {
        xPositions.push(drawX - tileSizeX);
      }

      const yPositions = [drawY];
      if (drawY + height > totalHeight) {
        yPositions.push(drawY - totalHeight);
      }

      xPositions.forEach((x, xIndex) => {
        yPositions.forEach((y, yIndex) => {
          elements.push(
            <g
              key={`${baseX}-${baseY}-${rowIndex}-${xIndex}-${yIndex}`}
              transform={`translate(${x}, ${y})`}
            >
              <g
                transform={
                  isFlipped ? `matrix(-1 0 0 1 ${width} 0)` : undefined
                }
              >
                <image
                  href={href}
                  width={width}
                  height={height}
                  style={{ imageRendering: "pixelated", opacity }}
                >
                  {enableRockingAnim && (
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values={`-10 ${width / 2} ${height / 2}; 10 ${
                        width / 2
                      } ${height / 2}; -10 ${width / 2} ${height / 2}`}
                      dur="4s"
                      repeatCount="indefinite"
                      begin={rowIndex % 2 === 1 ? "-0.5s" : "0s"}
                    />
                  )}
                </image>
              </g>
            </g>
          );
        });
      });
    });

    return elements;
  };

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      style={{ imageRendering: "pixelated" }}
    >
      <svg width="100%" height="100%">
        <defs>
          <pattern
            id="duck-pattern"
            x="0"
            y="0"
            width={tileSizeX}
            height={tileSizeY * 2}
            patternUnits="userSpaceOnUse"
          >
            <animateTransform
              attributeName="patternTransform"
              type="translate"
              from="0 0"
              to={`${tileSizeX} ${tileSizeY * 2}`}
              dur="60s"
              repeatCount="indefinite"
            />
            {renderImage(
              duckImg,
              duckX,
              duckY,
              duckSize,
              duckSize,
              0.2,
              (rowIndex) => rowIndex === 1,
              true
            )}
            {renderImage(
              lineImg,
              line1X,
              line1Y,
              lineSize,
              lineSize,
              0.1,
              false
            )}
            {renderImage(
              lineImg,
              line2X,
              line2Y,
              lineSize,
              lineSize,
              0.1,
              true
            )}
          </pattern>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#duck-pattern)"
        />
      </svg>
    </div>
  );
};

export default BackgroundPattern;
