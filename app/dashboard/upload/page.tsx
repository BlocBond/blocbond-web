"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// import { Input } from '@/components/ui/input';
// import { cn } from "@/lib/utils"

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

  function uploadFormSubmit () {
    const routeName = document.getElementById('uploadRouteName') as HTMLInputElement;
    const gymName = document.getElementById('uploadGymName') as HTMLInputElement;
    const vRating = document.getElementById('uploadVRating') as HTMLInputElement;
    const category = document.getElementById('uploadCategory') as HTMLInputElement;
    const description = document.getElementById('uploadDescription') as HTMLInputElement;
    const holdType = document.getElementById('uploadHoldType') as HTMLInputElement;


    if (routeName?.value && gymName?.value && vRating?.value && category?.value && description?.value && holdType?.value) {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL! + '/store_climb'
        
        const requestBody = {
            gym_id: "1",
            climb_name: routeName?.value,
            gym_name: gymName?.value,
            v_rating: vRating?.value,
            climb_type: category?.value,
            hold_type: holdType?.value,
            description: description?.value,
            image_name: "grotto_newholds"
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(requestBody),
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log("Register/Login request ok");
            router.push('/dashboard')
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
        // May be important for token implementation
        // .then(response => response.json())
        // .then(json => {
        //     console.log('Request', json)
        // })
    }
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className = "flex flex-col gap-5">
        <div className = "pt-10 pb-10 flex justify-center text-4xl font-bold text-center">
          Upload
        </div>
          <div>
            Route Name
            <div className='border'>
              <input type="text" id="uploadRouteName" name="uploadRouteName"/>
            </div>
          </div>
          <div>
            Gym Name
            <div className='border flex'>
              <input type="text" id="uploadGymName" name="uploadGymName"/>
            </div>
          </div>
          <div>
            V-Rating
            <div className="border text-center">
              <select id="uploadVRating" name="uploadVRating">
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
              <select id="uploadCategory" name="uploadCategory">
                <option value="Overhang">Overhang</option>
                <option value="Slab">Slab</option>
                <option value="Dynamic">Dynamic</option>
              </select>
            </div>
          </div>
          <div>
            Hold Type
            <div className="border text-center">
              <select id="uploadHoldType" name="uploadHoldType">
                <option value="Pinch">Pinch</option>
                <option value="Crimp">Crimp</option>
                <option value="Jug">Jug</option>
              </select>
            </div>
          </div>
          <div>
            Description
            <div className='border'>
              <input type="text" id="uploadDescription" name="uploadDescription"/>
            </div>
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
              <Button variant="secondary" type="submit" onClick={uploadFormSubmit}>
                Submit
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasComponent;
