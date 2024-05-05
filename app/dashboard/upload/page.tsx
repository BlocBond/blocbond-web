"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils"

interface Square {
  x: number;
  y: number;
  width: number;
  height: number;
}

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [squares, setSquares] = useState<Square[]>([]);
  const [strokeColor, setStrokeColor] = useState<string>('black'); // Default stroke color
  const startPosition = useRef<{ x: number; y: number } | null>(null);
  const endPosition = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    const drawSquare = (square: Square) => {
      if (!context) return;
      context.strokeStyle = strokeColor; // Set the outline color to red
      context.lineWidth = 2; // Set the outline width
      context.strokeRect(square.x, square.y, square.width, square.height); // Draw the outline
    };

    // const fillCanvas = (color: string) => {
    //   if (!context) return;
    //   context.fillStyle = color;
    //   context.fillRect(0, 0, canvas.width, canvas.height);
    // };

    const drawAllSquares = () => {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      squares.forEach((square) => drawSquare(square));
    };

    const handleMouseDown = (event: MouseEvent) => {
      startPosition.current = { x: event.clientX - canvas.getBoundingClientRect().left, y: event.clientY - canvas.getBoundingClientRect().top };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!startPosition.current) return;
      endPosition.current = { x: event.clientX - canvas.getBoundingClientRect().left, y: event.clientY - canvas.getBoundingClientRect().top };
      drawAllSquares();
      const newSquare: Square = {
        x: startPosition.current.x,
        y: startPosition.current.y,
        width: endPosition.current.x - startPosition.current.x,
        height: endPosition.current.y - startPosition.current.y,
      };
      drawSquare(newSquare);
    };

    const handleMouseUp = () => {
      if (startPosition.current && endPosition.current) {
        const newSquare: Square = {
          x: startPosition.current.x,
          y: startPosition.current.y,
          width: endPosition.current.x - startPosition.current.x,
          height: endPosition.current.y - startPosition.current.y,
        };
        setSquares((prevSquares) => [...prevSquares, newSquare]);
        startPosition.current = null;
        endPosition.current = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);


    const handleResize = () => {
      handleImageLoad(); // Call handleImageLoad when window is resized
    };

    window.addEventListener('resize', handleResize);

  
    // Redraw all squares when squares or image size change
    drawAllSquares();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [squares, imageSize, strokeColor]);

  const handleClear = () => {
    setSquares([]);
    drawAllSquares(); // Redraw all squares after clearing
  };

  const drawAllSquares = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    squares.forEach((square) => {
      context.strokeStyle = strokeColor;
      context.lineWidth = 2;
      context.strokeRect(square.x, square.y, square.width, square.height);
    });
  };

  const handleImageLoad = () => {
    const target = document.querySelector('.image-component') as HTMLImageElement;
    setImageSize({ width: target.width, height: target.height });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeColor(event.target.value); // Update stroke color based on color picker value
  };

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImageSrc(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className = "flex flex-col gap-5">
        <div className = "pt-10 pb-10 flex justify-center text-4xl font-bold text-center">
          Upload
        </div>
          <div>
            Route Name
            <Input/>
          </div>
          <div>
            Gym Name
            <Input/>
          </div>
          <div>
            V-Rating
            <div className="border text-center">
              <select id="dropdown" name="v-rating">
                <option value="V-1">V-1</option>
                <option value="V-2">V-2</option>
                <option value="V-3">V-3</option>
                <option value="V-4">V-4</option>
                <option value="V-5">V-5</option>
                <option value="V-6">V-6</option>
                <option value="V-7">V-7</option>
                <option value="V-8">V-8</option>
                <option value="V-9">V-9</option>
                <option value="V-10">V-10</option>
                <option value="V-11">V-11</option>
                <option value="V-12">V-12</option>
                <option value="V-13">V-13</option>
                <option value="V-14">V-14</option>
                <option value="V-15">V-15</option>
              </select>
            </div>
          </div>
          <div>
            Category
            <div className="border text-center">
              <select id="dropdown" name="category">
                <option value="Overhang">Overhang</option>
                <option value="Slab">Slab</option>
                <option value="Dynamic">Dynamic</option>
              </select>
            </div>
          </div>
          <div>
            Description
            <Input className={cn(
          "flex h-20 w-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        )}/>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-5">
        <div style={{ position: 'relative' }}>
        {imageSrc && <Image src={imageSrc} alt="Uploaded Image" width={800} height={600} onLoad={handleImageLoad} className="image-component" />}            {/* <Image src="/Route01.png" alt="Your Image" width={800} height={600} onLoad={handleImageLoad} className="image-component flex justify-center" /> */}
            <canvas
              ref={canvasRef}
              width={imageSize.width}
              height={imageSize.height}
              // className='border border-black'
              style={{ position: 'absolute', top: 0, left: 0 }}
            />
            <div className='flex justify-center'>
              <input type="file" onChange={handleFileChange} accept="image/*" />
            </div>
            <div className="pt-5 flex justify-center">
              <label htmlFor="colorPicker">Hold Highlighter:</label>
              <input
                id="colorPicker"
                type="color"
                value={strokeColor}
                onChange={handleColorChange}
                style={{ marginLeft: '10px' }}
              />
            </div>
            <div className="pt-5 gap-5 flex justify-center">
              <Button onClick={handleClear} variant="ghost" className="border border-black">
                Clear
              </Button>
              <Button variant="secondary">
                Submit
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;
