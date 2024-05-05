"use client";

import { motion } from "framer-motion";
import React from "react";
import { WobbleCard } from "@/components/ui/wobble-card";

import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

// return (
//     <div className="w-screen">
//         <div className="flex flex-col justify-center items-center">
//             <Image src="/BlocBondLogo-transparent.png" alt="BlockBond Logo" width={500} height={500} />
//             <p className="text-xl font-medium">BlocBond allows climbers to keep track of all the climbing routes they complete from gyms all around the world</p>
//             <Button className="mt-8 text-2xl" size={"lg"}>Get Started</Button>
//         </div>
//     </div>
// )

export default function Home() {
  function handleDefaultLogin () {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    if (email?.value && password?.value) {
        const url = process.env.NEXT_PUBLIC_BACKEND_URL! + '/authenticate'
        
        const requestBody = {
            username: email?.value,
            password: password?.value
        };
        console.log(requestBody)

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(requestBody),
            credentials: 'include',
            // mode: 'no-cors'
        })
        .then(response => response.json())
        .then(json => {
            console.log('parsed json', json) // access json.body here
        })
        // .then(response => {
        //     console.log(response.json())
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     return response.json(); // Parse JSON response
        // })
        // .then(data => {
        //     console.log('Response:', data); 
        // })
        // .catch(error => {
        //     console.error('There was a problem with the fetch operation:', error);
        // });
    }
  }

  function handleGoogleLogin () {
    console.log("Calling fetch for google sign in")
  }

  return (
    <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="flex flex-row justify-between items-center w-full flex-">
          <Image
            className=""
            src="/BlocBondLogo-transparent.png"
            alt="BlockBond Logo"
            width={250}
            height={250}
          />
          {/* <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            BlocBond
          </div> */}
          <div className="max-w-96 text-right mr-10">
            <p className="text-2xl mb-4 text-cyan-950 font-medium">
              Join BlocBond today and find <br />new routes to climb
            </p>
            <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="outline-cyan-950 border-2">Get Started</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get Started</DialogTitle>
          <DialogDescription>
            Join BlocBond or sign in.
          </DialogDescription>
        </DialogHeader>
        <GoogleSignInButton />
        <div className="mx-auto w-52 my-2.5">
  <div className="relative text-center text-xl">
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
    <span className="relative bg-white px-2 text-black/50 text-sm">or</span>
  </div>
</div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
              className="col-span-3"
            />
          </div>
        </div>
        
        <DialogFooter>
          {/* <Link href="/dashboard"><Button variant="outline" type="submit">Continue</Button></Link> */}
          <Button variant="outline" type="submit" onClick={handleDefaultLogin}>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
          </div>
        </div>
        {/* <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Keep track of all the climbing routes you complete from gyms all
          around the world.
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-6xl mx-auto w-full">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-secondary min-h-[300px] lg:min-h-[100px]"
            className=""
          >
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                For climbers, by climbers
              </h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">
                Find new routes to climb and keep track of your progress.
              </p>
            </div>
            {/* <Image
              src="/linear.webp"
              width={500}
              height={500}
              alt="linear demo image"
              className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
            /> */}
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 bg-teal-900 min-h-[100px]">
            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
              Start at a gym near you
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              View gyms in your local area with BlocBond Map View.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-cyan-950 min-h-[300px] lg:min-h-[400px] xl:min-h-[100px]">
            <div className="">
              <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
                Accessibility—everyone can climb
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              Designed with accessibility in mind, BlocBond helps colourblind climbers navigate their routes. 
              </p>
            </div>
            {/* <Image
              src="/linear.webp"
              width={500}
              height={500}
              alt="linear demo image"
              className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
            /> */}
          </WobbleCard>
        </div>
      </motion.div>
    </div>
  );
}
