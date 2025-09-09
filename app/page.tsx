"use client";

import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { AnimatePresence, motion, MotionConfig, stagger } from "motion/react";
import useMeasure from "react-use-measure";
import Image from "next/image";
import { AccordionItemType, data } from "./data";
import { XMark, Caret, Plus } from "./icons";

export default function Home() {
  const [value, setValue] = useState<string>("");

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 80,
        mass: 4,
      }}
    >
      <main className="font-sans flex flex-col justify-center items-center min-h-screen bg-background-alt">
        <div className="relative h-[720px] w-full max-w-screen-2xl bg-background 2xl:rounded-lg flex flex-col justify-center overflow-hidden">
          <CloseButton value={value} setValue={setValue} />
          <AccordionControls value={value} setValue={setValue} />
          <Accordion.Root
            type="single"
            value={value}
            onValueChange={setValue}
            className="ml-[min(90px,6.25vw)] flex flex-col justify-center items-start gap-3"
          >
            {data.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={value === item.id}
                value={item.id}
                setValue={setValue}
              />
            ))}
          </Accordion.Root>
        </div>
      </main>
    </MotionConfig>
  );
}

type CloseButtonProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function CloseButton({ value, setValue }: CloseButtonProps) {
  return (
    <AnimatePresence initial={false}>
      {value !== "" && (
        <motion.div
          initial={{
            opacity: 0,
            transform: "translateY(86px) scale(0)",
          }}
          animate={{
            opacity: 1,
            transform: "translateY(0px) scale(1)",
          }}
          exit={{
            opacity: 0,
            transform: "translateY(86px) scale(0)",
          }}
          className="absolute top-4 right-4"
        >
          <button
            onClick={() => setValue("")}
            className="cursor-pointer rounded-full size-9 bg-background-gray flex items-center justify-center"
          >
            <span className="sr-only">Close</span>
            <XMark />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type AccordionControlsProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    transform: "translateY(86px) scale(0)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
  },
};

function AccordionControls({ value, setValue }: AccordionControlsProps) {
  const currentIndex = data.findIndex((item) => item.id === value);
  const nextIndex = currentIndex + 1;
  const previousIndex = currentIndex - 1;

  return (
    <motion.div
      initial="hidden"
      animate={value === "" ? "hidden" : "visible"}
      variants={{
        hidden: {
          transition: {
            delayChildren: stagger(0.025, { from: "last" }),
          },
        },
        visible: {
          transition: {
            delayChildren: stagger(0.025),
          },
        },
      }}
      className="absolute top-0 left-0 bottom-0 w-[min(90px,6.25vw)] flex flex-col justify-center items-center gap-5"
    >
      <motion.div variants={buttonVariants}>
        <button
          disabled={value === data[0].id}
          onClick={() => setValue(data[previousIndex].id)}
          className="cursor-pointer rounded-full size-9 bg-background-gray flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-100"
        >
          <span className="sr-only">Previous</span>
          <Caret className="rotate-180 size-10" />
        </button>
      </motion.div>
      <motion.div variants={buttonVariants}>
        <button
          disabled={value === data[data.length - 1].id}
          onClick={() => setValue(data[nextIndex].id)}
          className="cursor-pointer rounded-full size-9 bg-background-gray flex items-center justify-center  disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-100"
        >
          <span className="sr-only">Next</span>
          <Caret />
        </button>
      </motion.div>
    </motion.div>
  );
}

type AccordionItemProps = {
  item: AccordionItemType;
  isOpen: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

function AccordionItem({ item, isOpen, setValue, value }: AccordionItemProps) {
  const [buttonRef, { width: buttonWidth }] = useMeasure();
  const [selectedColor, setSelectedColor] = useState<{
    name: string;
    code: string;
  } | null>(data.find((item) => item.id === "colours")?.colors?.[0] ?? null);

  return (
    <Accordion.Item asChild value={value}>
      <motion.div
        style={{
          borderRadius: 28,
        }}
        animate={
          buttonWidth
            ? {
                width: isOpen ? 423 : buttonWidth,
                height: isOpen ? "auto" : 56,
              }
            : {}
        }
        className="bg-background-gray w-fit relative overflow-hidden shadow-custom"
      >
        <Accordion.Header asChild>
          <Accordion.Trigger asChild>
            <motion.button
              ref={buttonRef}
              className="h-14 pl-3.5 pr-8 text-[17px] cursor-pointer font-semibold tracking-[-0.022em] leading-[1.2] flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 whitespace-nowrap"
              onClick={() => setValue(isOpen ? "" : value)}
              style={{
                borderRadius: 28,
                pointerEvents: isOpen ? "none" : "auto",
              }}
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              initial={{
                opacity: 1,
              }}
              transition={{
                duration: isOpen ? 0.1 : 0.3,
                delay: isOpen ? 0 : 0.3,
              }}
            >
              {item.id === "colours" ? (
                <div
                  className="size-6 rounded-full inset-shadow-2xs inset-shadow-black/40"
                  style={{
                    backgroundColor: selectedColor?.code,
                  }}
                />
              ) : (
                <Plus />
              )}
              <span>{item.title}</span>
            </motion.button>
          </Accordion.Trigger>
        </Accordion.Header>

        <AnimatePresence initial={false}>
          {isOpen && (
            <Accordion.Content forceMount asChild>
              <motion.div
                style={{
                  borderRadius: 28,
                }}
                className="w-[423px] h-full -mt-14 flex flex-col justify-end"
                initial="closed"
                animate="open"
                exit="closed"
              >
                <motion.div
                  variants={{
                    open: {
                      opacity: 1,
                      transform: "translateY(0px)",
                      transition: {
                        delay: 0.3,
                        duration: 0.5,
                        transform: {
                          duration: 0,
                        },
                      },
                    },
                    closed: {
                      opacity: 0,
                      transform: "translateY(24px)",
                      transition: {
                        delay: 0,
                        duration: 0.3,
                      },
                    },
                  }}
                  className="h-full flex flex-col justify-between"
                >
                  <p className="p-[28px] text-[17px] tracking-[-0.022em]">
                    <span className="font-semibold">{item.title}. </span>
                    {item.description}
                    {item.id === "colours" && `  ${selectedColor?.name}.`}
                  </p>
                  {item.imagePath && (
                    <motion.div className="relative w-full aspect-video">
                      <Image
                        src={item.imagePath}
                        alt={item.title}
                        fill
                        sizes="423px"
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  )}
                  {item.id === "colours" && (
                    <RadioGroup.Root
                      value={selectedColor?.name}
                      onValueChange={(value) =>
                        setSelectedColor(
                          item.colors?.find((color) => color.name === value) ??
                            null
                        )
                      }
                      className="flex gap-3.5 justify-center items-center pb-[28px]"
                    >
                      {item.colors?.map((color) => (
                        <RadioGroup.Item
                          key={color.name}
                          value={color.name}
                          className="size-6 rounded-full inset-shadow-xs inset-shadow-black/40 outline-2 outline-transparent data-[state=checked]:outline-foreground outline-offset-2 cursor-pointer"
                          style={{ backgroundColor: color.code }}
                        />
                      ))}
                    </RadioGroup.Root>
                  )}
                </motion.div>
              </motion.div>
            </Accordion.Content>
          )}
        </AnimatePresence>
      </motion.div>
    </Accordion.Item>
  );
}
