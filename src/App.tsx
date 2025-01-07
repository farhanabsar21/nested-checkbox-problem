import { useState } from "react";
import { checkBoxesInit } from "./data";

interface CheckboxItem {
  id: number;
  label: string;
  checked: boolean;
  children?: CheckboxItem[];
}

function App() {
  const [checkboxInitItems, setCheckboxInitItems] =
    useState<CheckboxItem[]>(checkBoxesInit);

  // update all children with recursion
  const updateAllChildren = (
    item: CheckboxItem,
    checked: boolean
  ): CheckboxItem => {
    return {
      ...item,
      checked,
      children: item.children?.map((child) =>
        updateAllChildren(child, checked)
      ),
    };
  };

  // update all children with recursion
  const updateParentStatus = (items: CheckboxItem[]): CheckboxItem[] => {
    return items.map((item) => {
      if (item.children) {
        const updatedChildren = updateParentStatus(item.children);
        const allChecked = updatedChildren.every((child) => child.checked);
        return {
          ...item,
          checked: allChecked,
          children: updatedChildren,
        };
      }
      return item;
    });
  };

  // updating the default checkbox state
  const updateCheckboxState = (
    items: CheckboxItem[],
    id: number,
    checked: boolean
  ): CheckboxItem[] => {
    return items.map((item) => {
      if (item.id === id) {
        const updatedItem = updateAllChildren(item, checked);
        return updatedItem;
      } else if (item.children) {
        return {
          ...item,
          children: updateCheckboxState(item.children, id, checked),
        };
      }
      return item;
    });
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setCheckboxInitItems((prev) => {
      const updated = updateCheckboxState(prev, id, checked);
      return updateParentStatus(updated);
    });
  };

  // checking is root is indeterminate
  const isIndeterminate = (item: CheckboxItem): boolean => {
    if (!item.children) return false;

    const checkedCount = item.children.filter((child) => child.checked).length;
    return checkedCount > 0 && checkedCount < item.children.length;
  };

  const renderCheckboxes = (items: CheckboxItem[]) => {
    return items.map((item) => (
      <div key={item.id} className={`p-1 ${item.children ? "ml-5" : "ml-0"}`}>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={item.checked}
            ref={(el) => {
              if (el) {
                el.indeterminate = isIndeterminate(item);
              }
            }}
            onChange={(e) => handleCheckboxChange(item.id, e.target.checked)}
            className="h-4 w-4"
          />
          {item.label}
        </label>
        {item.children && <div>{renderCheckboxes(item.children)}</div>}
      </div>
    ));
  };

  return (
    <div className="App">
      <div className="h-screen w-full flex items-center justify-center">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-xl p-4">Nested Checkboxes</h1>
          <div>{renderCheckboxes(checkboxInitItems)}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
