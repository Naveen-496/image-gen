import { db } from "@/db";
import Image from "next/image";
import { ScrollArea } from "./ui/scroll-area";

export default async function RecentImages() {
  const recentImages = await db.image.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <ScrollArea className="h-screen p-4">
      <div className="flex flex-col gap-4 ">
        {recentImages.map((image, ind) => {
          return (
            <div className="border border-b rounded" key={image.id}>
              <div className="p-2 space-y-4">
                <h3>{image.name}</h3>
                <Image
                  src={image.imageUrl}
                  alt={image.name}
                  width={200}
                  height={200}
                  className="object-cover aspect-square rounded-lg"
                />
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
