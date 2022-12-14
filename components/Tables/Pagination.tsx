import React from "react";

type Props = {
  data: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = (props: Props) => {
  return (
    <>
      <div className={`flex flex-wrap gap-2 mt-auto sm:mr-[300px]`}>
        <button
          className="w-10 h-10 bg-white dark:bg-slate-800 dark:text-white shadow-md rounded-xl  hover:scale-110 transition-all ease-in-out duration-200 hover:shadow-xl"
          onClick={() =>
            props.data.current_page > 1 &&
            props.setPage(props.data.current_page - 1)
          }
        >
          <i className="fi-rr-angle-small-left" />
        </button>
        {/* {Array(props.data.current_page)
          .fill(true) */}
        {/* {Array.from({ length: props.data.last_page }, (_, i) => i + 1).map(
          (item) => (
            <button
              key={item}
              className={`w-10 h-10 text-xs dark:text-white shadow-md rounded-xl hover:scale-110 transition-all ease-in-out duration-200 hover:shadow-xl ${
                props.data.current_page === item
                  ? `bg-gradient-to-tl from-green-700 to-lime-500 text-white`
                  : `bg-white dark:bg-slate-800`
              }`}
              onClick={() => props.setPage(item)}
            >
              {item}
            </button>
          )
        )} */}
        {props.data.links.map(
          (item: any, index: number) =>
            index > 0 &&
            index < props.data.links.length - 1 && (
              <button
                key={item.label}
                className={`w-10 h-10 text-xs dark:text-white shadow-md rounded-xl hover:scale-110 transition-all ease-in-out duration-200 hover:shadow-xl ${
                  item.active
                    ? `bg-gradient-to-tl from-green-700 to-lime-500 text-white`
                    : `bg-white dark:bg-slate-800`
                }`}
                onClick={() => props.setPage(item.label)}
              >
                {item.label}
              </button>
            )
        )}
        <button
          className="w-10 h-10 bg-white dark:bg-slate-800 dark:text-white shadow-md rounded-xl hover:scale-110 transition-all ease-in-out duration-200 hover:shadow-xl"
          onClick={() =>
            props.data.current_page < props.data.last_page &&
            props.setPage(props.data.current_page + 1)
          }
        >
          <i className="fi-rr-angle-small-right" />
        </button>
      </div>
    </>
  );
};

export default Pagination;
