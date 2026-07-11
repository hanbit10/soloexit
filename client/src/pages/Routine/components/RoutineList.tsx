/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent } from "@/components/ui/Card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Product } from "@/types";
import { Plus } from "lucide-react";

export function RoutineList({ products }: { products: Product[] }) {
  return (
    <Card>
      <CardContent className="space-y-4 flex justify-center">
        <Carousel className="w-full max-w-48 sm:max-w-xs md:max-w-sm">
          <CarouselContent className="-ml-1">
            <CarouselItem className="basis-1/2 pl-1 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                    <div className="text-center">Add to routine</div>
                    <Plus className="w-6 h-6 m-2" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            {products.map((product, index) => (
              <CarouselItem key={product.id} className="basis-1/2 pl-1 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <div className="text-center">
                        <span className="text-2xl font-semibold">{index + 1}</span>
                        <p className="mt-2 text-sm">{product.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}
