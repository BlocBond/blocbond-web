"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Input } from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';

// import { Input } from '@/components/ui/input';
// import { cn } from "@/lib/utils"

interface Square {
  x: number;
  y: number;
  width: number;
  height: number;
}

const holdTypes = [
  { key: "Pinch", label: "Pinch" },
  { key: "Crimp", label: "Crimp" },
  { key: "Jug", label: "Jug" }
];

const categories = [
  { key: "Overhang", label: "Overhang" },
  { key: "Slab", label: "Slab" },
  { key: "Dynamic", label: "Dynamic" },
];

const vratings = [
  { key: "V-1", label: "V-1" },
  { key: "V-2", label: "V-2" },
  { key: "V-3", label: "V-3" },
  { key: "V-4", label: "V-4" },
  { key: "V-5", label: "V-5" },
  { key: "V-6", label: "V-6" },
  { key: "V-7", label: "V-7" },
  { key: "V-8", label: "V-8" },
  { key: "V-9", label: "V-9" },
  { key: "V-10", label: "V-10" },
  { key: "V-11", label: "V-11" },
  { key: "V-12", label: "V-12" },
  { key: "V-13", label: "V-13" },
  { key: "V-14", label: "V-14" },
  { key: "V-15", label: "V-15" },
];

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
      // drawBackgroundImage()
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
  
  function drawBackgroundImage() {
    const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    
    const img = new (window as any).Image();;
    img.onload = function() {
      canvas.width = 800;
      canvas.height = 600;
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = imageSrc;
    console.log(imageSrc)

  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }
    const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    
    reader.onload = () => {
      setImageSrc(reader.result as string)
      // drawBackgroundImage()
      const img = new (window as any).Image();;
      img.onload = function() {
        canvas.width = 800;
        canvas.height = 600;
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      img.src = reader.result
    };
      
  };
  // Function to convert data URL to blob
  function dataURItoBlob(dataURI: any) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeString });
  }

  function handleCombineCanvases() {
    const canvas1 = document.getElementById('canvas') as HTMLCanvasElement;
    const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement;

    const ctx2 = canvas2?.getContext('2d');

    ctx2?.drawImage(canvas1, 0, 0);

    const imageDataURL = canvas2.toDataURL();
    const routeName = document.getElementById('uploadRouteName') as HTMLInputElement;
    const gymName = document.getElementById('uploadGymName') as HTMLInputElement;
    const vRating = document.getElementById('uploadVRating') as HTMLInputElement;
    const category = document.getElementById('uploadCategory') as HTMLInputElement;
    const description = document.getElementById('uploadDescription') as HTMLInputElement;
    const holdType = document.getElementById('uploadHoldType') as HTMLInputElement;
   
    const url = process.env.NEXT_PUBLIC_BACKEND_URL! + '/store_climb'
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
          image_data: imageDataURL,
          image_name: "grotto_new"
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
          throw new Error('Failed to upload image');
        }

        console.log("YAY", response);
        toast.success("Successfully uploaded route.");
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    }
    // const requestBody = {
    //   image_name: imageDataURL,
    //   description: "",
    //   hold_type: "",
    //   climb_type: "",
    //   v_rating: "",
    //   gym_name: "",
    //   climb_name: routeName,
    //   gym_id: ""
    // }

    
    // const imgElement = document.createElement('img');
    // imgElement.src = combinedImage;

    // // Optionally, you can download the combined image as a file
    // // by creating a link element and simulating a click on it
    // const downloadLink = document.createElement('a');
    // downloadLink.href = combinedImage;
    // downloadLink.download = 'combined_image.png';
    // downloadLink.click();
  }
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedHoldType, setSelectedHoldType] = useState("");
  const [selectedVRating, setSelectedVRating] = useState("");

  return (
    <>
      <div style={{ fontWeight: 'bold', marginLeft: '12px', marginTop: '4px', marginBottom: '4px', display: 'block' }}>
        <input
          type="file"
          id="uploadRouteName"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        <Button   
          onClick={() => {
            const inputElement = document.getElementById('uploadRouteName');
            if (inputElement) {
              inputElement.click();
            }
          }} 
          variant="secondary"
          style={{ marginBottom: '5px', fontSize: "20px"}}> Upload an image of a climb:
        </Button>
      </div>

      <div style={{ position: 'relative' }}>
        <canvas
          // ref={canvasRef2}
          width={imageSize.width}
          height={imageSize.height}
          className='border border-black'
          style={{ position: 'absolute', top: 0, left: 12 }}
          id="canvas2"
        />
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className='border border-black'
          style={{ position: 'absolute', top: 0, left: 12 }}
          id="canvas"
        />

        <div className="pt-5 mt-[600px]">
          <label htmlFor="colorPicker" style={{ fontWeight: 'bold', marginLeft: '12px', marginTop: '4px', marginBottom: '4px', display: 'block' }}>Color:</label>
          <Input
            id="colorPicker"
            type="color"
            value={strokeColor}
            onChange={handleColorChange}
            style={{
              width: '55px', 
            }}
          />
        </div>

          <div>
            <label htmlFor="uploadRouteName" style={{ fontWeight: 'bold', marginLeft: '12px', marginTop: '4px', marginBottom: '4px', display: 'block' }}>
              Route Name
            </label>
            <Input
              type="text"
              id="uploadRouteName"
              name="uploadRouteName"
              fullWidth
              placeholder="Enter route name"
            />
          </div>

          <div>
            <label htmlFor="uploadGymName" style={{ fontWeight: 'bold', marginLeft: '12px', marginTop: '4px', marginBottom: '4px', display: 'block' }}>
              Gym Name
            </label>
            <Input
              type="text"
              id="uploadGymName"
              name="uploadGymName"
              fullWidth
              placeholder="Enter gym name"
            />
          </div>

          <div>
            <label htmlFor="uploadDescription" style={{ fontWeight: 'bold', marginLeft: '12px', marginTop: '4px', marginBottom: '4px', display: 'block' }}>
              Description
            </label>
            <Input
              type="text"
              id="uploadDescription"
              name="uploadDescription"
              fullWidth
              placeholder="Enter description"
            />
          </div>

      <div>
        <p style={{ fontWeight: 'bold', marginLeft: '12px', marginTop: '4px', marginBottom: '4px', display: 'block' }}>V-rating</p>
        <div className="border text-center flex">
          <Select
            isRequired
            id="uploadVRating"
            name="uploadVRating"
            placeholder="Select a V-rating"
            className="max-w-xs"
            onChange={(vrating) => setSelectedVRating(vrating.target.value)}
          >
            {vratings.map((vrating) => (
              <SelectItem 
                key={vrating.key}
                style={{
                  backgroundColor: 'white', // or any color you prefer
                  color: 'black', // text color
                  padding: '10px', // adjust padding as needed
                }}
              >
                {vrating.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <p style={{ fontWeight: 'bold', marginLeft: '12px', marginTop: '4px', marginBottom: '4px', display: 'block' }}>Category</p>
        <div className="border text-center flex">
          <Select
            isRequired
            id="uploadCategory"
            name="uploadCategory"
            placeholder="Select a category"
            className="max-w-xs"
            onChange={(category) => setSelectedCategory(category.target.value)}
          >
            {categories.map((category) => (
              <SelectItem 
                key={category.key}
                style={{
                  backgroundColor: 'white', // or any color you prefer
                  color: 'black', // text color
                  padding: '10px', // adjust padding as needed
                }}
              >
                {category.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <p style={{ fontWeight: 'bold', marginLeft: '12px', marginTop: '4px', marginBottom: '4px', display: 'block' }}>Hold Type</p>
        <div className="border text-center flex">
          <Select
            id="uploadHoldType"
            name="uploadHoldType"
            isRequired
            className="max-w-xs"
            placeholder='Select hold type'
            onChange={(holdType) => setSelectedHoldType(holdType.target.value)}
          >
            {holdTypes.map((holdType) => (
              <SelectItem key={holdType.key}             
              style={{
                backgroundColor: 'white', // or any color you prefer
                color: 'black', // text color
                // padding: '8px', // adjust padding as needed
              }}>
                {holdType.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>

        <div className="pt-5 flex gap-5">
          <Button onClick={handleClear} variant="ghost" className="border border-black">
            Clear
          </Button>
          <Button onClick={handleCombineCanvases} variant="secondary">
            Submit
          </Button>
        </div>
      </div>

    </>
  );
};

export default CanvasComponent;
