// @ts-nocheck

import { FC, useRef, Children, useEffect } from 'react'
import { Box } from "@chakra-ui/react";
import {
    Select,
    GroupBase,
    chakraComponents,
    SelectComponentsConfig
} from "chakra-react-select";
import { useVirtualizer } from "@tanstack/react-virtual";

const customComponents: SelectComponentsConfig<SelectItem, true, GroupBase<SelectItem>> = {
    MenuList: ({ innerRef, children, selectProps, ...props }) => {
      // We need our own ref to target the menu list with
      // the `innerRef` prop is unfortunately only a callback ref
      const menuListRef = useRef<HTMLDivElement>();
      const callbackRef = (instance: HTMLDivElement) => {
        menuListRef.current = instance;
        innerRef(instance);
      };
  
      useEffect(() => {
        menuListRef.current?.setAttribute("data-menu-list-added", "true");
      }, []);
  
      // The heights for each element in the array
      const height = {
        sm: 30.6,
        md: 36.8,
        lg: 43
      }[selectProps.size || "md"];
  
      const rowVirtualizer = useVirtualizer({
        count: Children.count(children),
        getScrollElement: () => menuListRef.current,
        estimateSize: () => height
      });
  
      return (
        <chakraComponents.MenuList
          innerRef={callbackRef}
          selectProps={selectProps}
          {...props}
        >
          <Box
            position="relative"
            h={`${rowVirtualizer.getTotalSize()}px`}
            w="100%"
            maxHeight='200px'
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => (
              <Box
                key={virtualRow.index}
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h={`${height}px`}
                transform={`translateY(${virtualRow.start}px)`}
              >
                {Children.toArray(children)[virtualRow.index]}
              </Box>
            ))}
          </Box>
        </chakraComponents.MenuList>
      );
    }
};

const CustomSelect : FC<CustomSelectProps> = ({ onChangeHandler, selectItems, selectedItems }) => {
    return(
        <Select<SelectItem, true, GroupBase<SelectItem>>
        isMulti
        classNamePrefix="chakra-react-select"
        className='border-[#aaa] w-full'
        options={selectItems}
        onChange={(e) => onChangeHandler(e)}
        components={customComponents}
        placeholder="Выберите значения"
        closeMenuOnSelect={false}
        menuShouldBlockScroll={false}
        captureMenuScroll={false}
        size='sm'
        value={selectedItems}
        />
    )
}

export default CustomSelect