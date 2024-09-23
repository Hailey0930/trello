import { CardProps } from "@/app/_types/Card";

export default function Card({ title, type }: CardProps) {
  return (
    <div className="flex flex-col font-medium min-h-14 w-full p-2 gap-2 bg-gray-300 rounded-lg dark:bg-slate-600 dark:text-white">
      {title}
      {type === "template" && (
        <div className="text-xs text-gray-600 bg-sky-200 px-2 py-1 w-fit rounded-lg">
          This card is a Template
        </div>
      )}
    </div>
  );
}
