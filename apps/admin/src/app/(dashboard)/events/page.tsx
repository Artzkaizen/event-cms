"use client";

// import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { Heart, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Events() {
  const { data: events } = api.events.all.useQuery({});
  const [likedEvents] = useState<Set<number>>(new Set());

  return (
    <>
      <div>
        <div className="bg-white rounded-2xl ">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Upcoming Events</h2>
            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Weekdays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Days</SelectItem>
                  <SelectItem value="weekdays">Weekdays</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="conference">Conference</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="art">Art</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Any Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {events?.data.map((event) => (
              <Link
                prefetch
                key={event.documentId}
                href={`/events/${event.documentId}`}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={"/placeholder.svg"}
                      alt={event.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      {/* <Badge
                      variant="secondary"
                      className="bg-white/90 text-gray-900"
                    >
                      {event.price}
                    </Badge> */}
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button className="bg-white/90 hover:bg-white p-2 rounded-full">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button
                        //   onClick={() => toggleLike(event.id)}
                        className="bg-white/90 hover:bg-white p-2 rounded-full"
                      >
                        <Heart
                          className={`w-4 h-4 ${likedEvents.has(event.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-center">
                        <div className="text-blue-600 font-medium">
                          {new Date(event.startTime).toLocaleString("en-US", {
                            month: "short",
                          })}
                        </div>
                        <div className="text-lg font-bold">
                          {new Date(event.startTime).getDay()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {event.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {/* {event.location.} */}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Events;
