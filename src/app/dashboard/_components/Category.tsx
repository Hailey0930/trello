import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import { Category as ICategory } from "@/app/_types/Category";

interface Props {
  category: ICategory;
}

function Category({ category }: Props) {
  return (
    <div className="w-272 h-fit bg-gray-100 rounded-lg p-2">
      <div className="flex items-center justify-between">
        <h1 className="font-medium px-2">{category.title}</h1>
        <div className="flex items-center gap-1">
          <button type="button" className="rounded-full px-1 hover:bg-gray-200">
            <EditOutlined style={{ color: "#5c5b5b" }} />
          </button>
          <button type="button" className="rounded-full px-1 hover:bg-gray-200">
            <DeleteOutlined style={{ color: "#5c5b5b" }} />
          </button>
        </div>
      </div>
      <footer className="p-2">
        <button
          type="button"
          className="flex items-center gap-2 text-sm bg-sky-300 text-white px-2 py-1 rounded-lg hover:bg-sky-400"
        >
          <PlusOutlined />
          <div> Add Card</div>
        </button>
      </footer>
    </div>
  );
}

export default Category;
