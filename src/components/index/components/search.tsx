"use client";
import Input from "@/components/ui/input";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdTransitEnterexit } from "react-icons/md";
import FormDrawer, { FormDrawerType } from "./drawer";
import toast, { Toaster } from "react-hot-toast";

const getRandomMessage = (type: "delete" | "update" | "add") => {
  const messagesDecider = () => {
    if (type === "delete")
      return [
        "Poof! Deleted!",
        "Gone with the wind!",
        "Whoosh! Vanished!",
        "Cue? What cue?",
        "Bam! It’s outta here!",
        "See ya, wouldn't wanna be ya!",
        "Zap! Cue eliminated!",
        "Hasta la vista, baby!",
        "All gone, like magic!",
        "Just like that, it’s gone!",
      ];

    if (type == "add")
      return [
        "Cue created!",
        "New cue, who dis?",
        "Voila! A new one!",
        "Fresh out of the oven!",
        "Boom! A new cue appears!",
        "Brand new and shiny!",
        "Cue added to the list!",
        "Created! Let’s get it done!",
        "Just made it!",
        "Added to your list!",
      ];

    return [
      "Updated and fresh!",
      "Revamped and ready!",
      "Polished to perfection!",
      "Tweaked and improved!",
      "Shiny and new!",
      "Spruced up and ready!",
      "Refreshed and better than ever!",
      "Adjusted and perfected!",
      "Changes saved!",
      "Done! It's better now!",
    ];
  };

  const messages = messagesDecider();

  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState<FormDrawerType | false>(false);

  const ref = useRef<HTMLInputElement>(null);

  const closeDrawer = () => {
    ref.current?.focus();
    setIsOpen(false);
  };

  const [items, setItems] = useState<FormDrawerType[]>([]);
  const filteredItems = items
    .sort((a, b) => (a?.title || "").localeCompare(b?.title || ""))
    .filter(({ msg, title }) => {
      const noCase = (string: string) => (string || "").toLowerCase();

      const checker = (string: string | undefined) =>
        noCase(string || "").includes(noCase(search));

      const initials = (title || "")
        .split(" ")
        .map((string) => string[0])
        .join("");

      return checker(title) || checker(msg) || checker(initials);
    });

  const onSubmit = (item?: FormDrawerType) => {
    ref.current?.blur();
    setSearch("");

    if (item) return setIsOpen(item);

    if (filteredItems.length) return setIsOpen(filteredItems[0]);

    setIsOpen({ title: search });
  };

  useEffect(() => {
    const arr: FormDrawerType[] = JSON.parse(
      localStorage.getItem("items") || "[]"
    );
    setItems(arr);
  }, []);

  const save = (array: FormDrawerType[]) => {
    setItems(array);
    localStorage.setItem("items", JSON.stringify(array));
    closeDrawer();
  };

  const searchboxDropdown = () => {
    const defaultClassName =
      "cursor-pointer transition-all bg-neutralColors-lightGray mt-2 hover:bg-neutralColors-mediumGray p-4 rounded-[8px] flex flex-row align-center";

    if (!search) return null;

    const add = (isNoIcon?: boolean) => (
      <div
        onClick={() => onSubmit({ title: search })}
        className={`${defaultClassName} absolute max-w-[95vw] sm:max-w-[50vw]`}
      >
        <p>
          <span className="font-semibold text-accentColors-softCoralRed">
            Create cue:
          </span>{" "}
          {search}{" "}
        </p>
        {!isNoIcon && <MdTransitEnterexit className="ml-2 mt-1" size={16} />}
      </div>
    );

    if (filteredItems.length) {
      const item = filteredItems[0];
      const { msg, title } = item;

      const isExist = title === search;

      return (
        <div className="relative">
          <div className="absolute top-[-33px]  pl-4" style={{ zIndex: 1.1 }}>
            <p>
              <span className="text-transparent">{search}</span>
              <span
                className="ml-2 bg-accentColors-lightTeal p-1 opacity-50 cursor-pointer"
                onClick={() => setIsOpen(item)}
              >
                - {title} (enter)
              </span>
            </p>
          </div>
          {!isExist && add(true)}
        </div>
      );
    }
    return add();
  };

  return (
    <>
      <div className="w-[95vw] sm:w-[50vw]" style={{ zIndex: 1 }}>
        <Toaster position="top-right" />
        <Input
          onBlur={() => {
            if (isOpen) return;
            const isPhone = window.innerWidth < 640;
            if (isPhone) return;
            ref.current?.focus();
          }}
          ref={ref}
          placeholder={
            items.length ? "Search or create your cue" : "Create your cue"
          }
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            const isEnter = e.key === "Enter";
            if (!isEnter) return;
            if (!search) return;
            onSubmit();
          }}
          value={search}
        />
        {searchboxDropdown()}

        <FormDrawer
          isOpen={isOpen}
          onClose={() => closeDrawer()}
          onSubmit={(values, isDelete) => {
            // delete update or create
            if (isDelete) {
              toast(getRandomMessage("delete"), {
                style: { backgroundColor: "#ff6b6b", color: "#1b355b" },
              });
              const arr = items.filter(({ title }) => title !== values.title);
              return save(arr);
            }

            const isUpdate = items.find(({ id }) => id === values.id);

            if (isUpdate) {
              toast(getRandomMessage("update"), {
                style: { backgroundColor: "#ffcc00", color: "#1b355b" },
              });

              const arr = items.map((item) => {
                if (item.title === values.title) return values;
                if (item.id === values.id) return values;
                return item;
              });
              return save(arr);
            }
            toast(getRandomMessage("add"), {
              style: { backgroundColor: "#98ff98", color: "#1b355b" },
            });

            const arr = [...items, { ...values, id: values.title }];

            save(arr);
          }}
        />
      </div>
      <MemoItems items={items} onClick={(val) => onSubmit(val)} />
    </>
  );
};

const MemoItems = ({
  items,
  onClick,
}: {
  items: FormDrawerType[];
  onClick: (val: FormDrawerType) => any;
}) => {
  const [itemLength, setItemLength] = useState(0);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const isChanged = itemLength !== items.length;
    setIsChanged(isChanged);
    setItemLength(items.length);
  }, [items.length]);

  return useMemo(() => {
    return items.map((item, index) => (
      <MemoItem
        key={index}
        isChanged={isChanged}
        item={item}
        itemLength={itemLength}
        onClick={onClick}
      />
    ));
  }, [items]);
};

const MemoItem = ({
  item,
  isChanged,
  itemLength,
  onClick,
}: {
  onClick: (val: FormDrawerType) => any;
  item: FormDrawerType;
  isChanged: boolean;
  itemLength: number;
}) => {
  const safeMath = () => {
    const number = Math.random();

    const isPhone = window.innerWidth < 640;
    if (isPhone) {
      if (number > 0.43 && number < 0.6) return safeMath();
      if (number > 0.8) return safeMath();
      if (number < 0.2) return safeMath();

      return number;
    }
    if (number > 0.43 && number < 0.55) return safeMath();
    if (number > 0.95) return safeMath();
    if (number < 0.05) return safeMath();
    return number;
  };

  const leftNumber = safeMath() * 100;
  const leftRaw = `${leftNumber}vw`;
  const [left, setLeft] = useState(leftRaw);
  const { title } = item;
  const top = `${safeMath() * 100}vh`;

  const colorDecider = () => {
    const number = Math.random();
    if (number < 0.2) return "#ff6b6b"; // 33% chance
    if (number < 0.4) return "#ffcc00"; // 33% chance
    if (number < 0.6) return "#e3e8f0";
    if (number < 0.8) return "#f4f4f4";
    return "#72c1d1"; // 34% chance
  };
  return (
    <p
      ref={(e) => {
        if (!e) return;
        if (left.includes("calc")) return;
        if (leftNumber * window.innerWidth + e.clientWidth > window.innerWidth)
          return setLeft(`calc(${leftRaw} - ${e.clientWidth}px)`);
      }}
      className={`${
        isChanged || !itemLength ? "opacity-100" : "opacity-0"
      } cursor-pointer transition-opacity duration-500 ease-in-out absolute text-lg font-semibold`}
      style={{
        left,
        top,
        color: colorDecider(),
      }}
      onClick={() => onClick(item)}
    >
      {title}
    </p>
  );
};

export default SearchInput;
