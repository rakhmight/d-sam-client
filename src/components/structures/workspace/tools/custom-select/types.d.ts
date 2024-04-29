declare interface CustomSelectProps {
    onChangeHandler: Function,
    selectItems: Array<SelectItemBase>,
    selectedItems: Array<SelectItemBase>
}

declare interface SelectItemBase{
  label: string | number | Date;
  value: string | number | Date;
}

declare interface SelectItem extends OptionBase, SelectItemBase {
}