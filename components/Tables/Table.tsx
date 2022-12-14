import Image from "next/image";
import { type } from "os";
import React, { Dispatch, SetStateAction, useState } from "react";

export interface TableColumn<T = any> {
  title: string;
  key: string;
  dataType?: "numbering";
  render?: (data: T, index: number) => void;
}

type Props = {
  data: any;
  columns: TableColumn[];
  selected?: number[];
  setSelected?: Dispatch<SetStateAction<number[]>>;
};

const Table = (props: Props) => {
  const [isChecked, setIsChecked] = useState(false);
  const selectAll = (e: any) => {
    setIsChecked(!isChecked);
    let init: number[] = [];
    props.selected!.length == 0
      ? props.setSelected!(
          props.data.data.map((item: any, index: number) => item.id)
        )
      : props.setSelected!([]);
  };
  const handleCheck = (e: any, index: number) => {
    setIsChecked(false);
    const { value, checked } = e.target;
    // const newData = [...props.selected!];
    // newData[index] = { selected: checked, id: parseInt(value) };
    const newData = props.selected!.filter((item) => item !== parseInt(value));
    props.setSelected!(newData);
  };
  // const selectAll = (e: any) => {
  //   setIsChecked(!isChecked);
  //   let init: Selected[] = [];
  //   props.data.data.map((item: any, index: number) => {
  //     init[index] = {
  //       selected: e.target.checked,
  //       id: item.id,
  //     };
  //   });
  //   props.setSelected!(init);
  // };
  // const handleCheck = (e: any, index: number) => {
  //   setIsChecked(false);
  //   const { value, checked } = e.target;
  //   const newData = [...props.selected!];
  //   newData[index] = { selected: checked, id: parseInt(value) };
  //   props.setSelected!(newData);
  // };
  if (!props.data) return <>Tidak ada Data</>;
  return (
    <div className="relative flex w-full overflow-x-auto rounded-lg shadow-xl">
      <table className="bg-white dark:bg-slate-800 rounded-lg table table-auto min-w-full">
        <thead>
          <tr className="text-left bg-gradient-to-tl from-green-700 to-lime-500 ">
            {props.selected && (
              <th className="py-2 px-4 w-8">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isChecked}
                  onChange={(e) => selectAll(e)}
                  className="cursor-pointer accent-current"
                />
              </th>
            )}
            {props.columns.map((item: any, index: number) => {
              return (
                <th key={item.title} className="py-2 px-4">
                  {item.title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.data.map((item: any, index: number) => {
            return (
              <tr
                key={item.id}
                className="odd:bg-slate-50 hover:bg-slate-100 dark:odd:bg-slate-700/50 dark:hover:bg-slate-700"
              >
                {props.selected && (
                  <td className="py-2 px-4 w-8">
                    <input
                      type="checkbox"
                      id={item.id}
                      value={item.id}
                      checked={props.selected.includes(item.id)}
                      onChange={(e) => handleCheck(e, index)}
                      className="cursor-pointer accent-current"
                    />
                  </td>
                )}
                {props.columns.map((col: any, colIndex: number) => {
                  let toShown = item[col.key];
                  if (col.render) toShown = col.render(item, index);
                  if (col.dataType === "numbering") {
                    toShown =
                      (props.data.current_page - 1) * props.data.per_page +
                      index +
                      1;
                  }

                  return (
                    <td key={colIndex} className="py-2 px-4">
                      {toShown}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
