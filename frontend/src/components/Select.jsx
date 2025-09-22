import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function SelectDemo({ items, placeholder, onChange, clickeado }) {
  return (
    <Select onValueChange={onChange} value={clickeado}>
      <SelectTrigger className="w-full border-base-content/20 text-base-content font-semibold">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items?.map((item) => (
            <SelectItem value={item.id.toString()}>{item.nombre}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
