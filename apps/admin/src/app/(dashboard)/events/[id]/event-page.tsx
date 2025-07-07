"use client";

import { api } from "@/trpc/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Globe,
  Mail,
  Phone,
  Building2,
  ExternalLink,
  DollarSign,
} from "lucide-react";

export const EventDetails = ({ id }: { id: string }) => {
  const [data, { error }] = api.events.byId.useSuspenseQuery({
    id,
    locale: "en",
  });

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-red-600 font-medium mb-2">
                Error Loading Event
              </div>
              <p className="text-red-500 text-sm">{error.message}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const event = data.data;

  // Add null checks
  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="font-medium mb-2">Event Not Found</div>
              <p className="text-sm text-muted-foreground">
                The requested event could not be found.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatFullDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getEventTypeColor = (type: string) => {
    const colors = {
      movie: "bg-purple-100 text-purple-800 border-purple-200",
      concert: "bg-blue-100 text-blue-800 border-blue-200",
      exhibition: "bg-green-100 text-green-800 border-green-200",
      theater: "bg-orange-100 text-orange-800 border-orange-200",
      workshop: "bg-yellow-100 text-yellow-800 border-yellow-200",
      conference: "bg-indigo-100 text-indigo-800 border-indigo-200",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-8 border">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getEventTypeColor(event.eventType)}`}
              >
                {event.eventType.charAt(0).toUpperCase() +
                  event.eventType.slice(1)}
              </div>
              <div className="text-sm text-slate-500">#{event.id}</div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              {event.name}
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-3xl">
              {event.description || "No description available"}
            </p>
          </div>
          {event.website && (
            <Button size="lg" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Event Website
            </Button>
          )}
        </div>

        {/* Quick Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            <div>
              <div className="text-sm font-medium text-slate-900">
                {formatDate(event.startTime)}
              </div>
              <div className="text-xs text-slate-500">
                {formatTime(event.startTime)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
            <MapPin className="h-5 w-5 text-green-600" />
            <div>
              <div className="text-sm font-medium text-slate-900">
                {event.location?.name || "TBD"}
              </div>
              <div className="text-xs text-slate-500">Venue</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
            <Users className="h-5 w-5 text-purple-600" />
            <div>
              <div className="text-sm font-medium text-slate-900">
                {event.maxCap?.toLocaleString() || "N/A"}
              </div>
              <div className="text-xs text-slate-500">Max Capacity</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-white rounded-lg border">
            <Building2 className="h-5 w-5 text-orange-600" />
            <div>
              <div className="text-sm font-medium text-slate-900">
                {event.organizer?.name || "Unknown"}
              </div>
              <div className="text-xs text-slate-500">Organizer</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Event Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <div className="font-medium text-green-900">
                      Event Starts
                    </div>
                    <div className="text-green-700">
                      {formatFullDate(event.startTime)}
                    </div>
                    <div className="text-sm text-green-600">
                      {formatTime(event.startTime)}
                    </div>
                  </div>
                  <div className="text-green-600">
                    <CalendarDays className="h-8 w-8" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div>
                    <div className="font-medium text-red-900">Event Ends</div>
                    <div className="text-red-700">
                      {formatFullDate(event.endTime)}
                    </div>
                    <div className="text-sm text-red-600">
                      {formatTime(event.endTime)}
                    </div>
                  </div>
                  <div className="text-red-600">
                    <Clock className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Venue Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {event.location?.name || "Unknown Location"}
                  </h3>
                  <p className="text-slate-600 mt-1">
                    {event.location?.address || "Address not available"}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-slate-500" />
                    <span className="text-sm text-slate-600">
                      Venue Capacity
                    </span>
                  </div>
                  <span className="font-medium">
                    {event.location?.capacity?.toLocaleString() || "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm text-slate-600">Status</span>
                  </div>
                  <Badge
                    variant={
                      event.location?.status === "active"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {event.location?.status || "unknown"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tickets */}
          {event.tickets && event.tickets.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Available Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="group p-4 border rounded-lg hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-slate-900">
                              {ticket.name}
                            </h4>
                            <Badge variant="outline" className="text-xs">
                              {ticket.type}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {ticket.format}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            {ticket.zone && <span>Zone: {ticket.zone}</span>}
                            {ticket.seat && <span>Seat: {ticket.seat}</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-slate-900">
                            ${ticket.price}
                          </div>
                          <div className="text-xs text-slate-500">
                            per ticket
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Organizer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {event.organizer?.name || "Unknown Organizer"}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {event.organizer?.type || "unknown"}
                  </Badge>
                </div>

                <Separator />

                <div className="space-y-3">
                  {event.organizer?.email && (
                    <a
                      href={`mailto:${event.organizer.email}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Mail className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-700">
                        {event.organizer.email}
                      </span>
                    </a>
                  )}
                  {event.organizer?.phoneNumber && (
                    <a
                      href={`tel:${event.organizer.phoneNumber}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Phone className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-700">
                        {event.organizer.phoneNumber}
                      </span>
                    </a>
                  )}
                  {event.organizer?.website && (
                    <a
                      href={event.organizer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <Globe className="h-4 w-4 text-slate-500" />
                      <span className="text-sm text-slate-700">
                        Visit Website
                      </span>
                      <ExternalLink className="h-3 w-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Event ID</span>
                  <span className="font-mono text-sm bg-slate-100 px-2 py-1 rounded">
                    {event.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Max Capacity</span>
                  <span className="font-medium">
                    {event.maxCap?.toLocaleString() || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Ticket Types</span>
                  <span className="font-medium">
                    {event.tickets?.length || 0}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Created</span>
                  <span className="text-sm">{formatDate(event.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Last Updated</span>
                  <span className="text-sm">{formatDate(event.updatedAt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
