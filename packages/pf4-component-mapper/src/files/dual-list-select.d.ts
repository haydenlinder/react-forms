import { UseFieldApiComponentConfig, AnyObject } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";
import FormGroupProps from "./form-group";
import { FormGroupProps as FormGrpProps, ListProps, ToolbarProps, TextInputProps, ButtonProps, GridProps, GridItemProps, TextContentProps, FlexProps, FlexItemProps } from "@patternfly/react-core";
import { SVGIconProps } from "@patternfly/react-icons/dist/js/createIcon";

export interface DualListSelectOption extends AnyObject {
  value?: any;
  label: ReactNode;
}

export interface RenderStatusInput {
  selected: number;
  options: number;
}

export interface RenderStatusFunction {
  (input: RenderStatusInput): ReactNode;
}

export interface VoidFunction {
  (): void;
}

export interface HandleOptionsFunction {
  (e: any, value: any): void;
}

interface InternalDualListSelectProps {
  leftTitle?: ReactNode;
  rightTitle?: ReactNode;
  moveLeftTitle?: ReactNode;
  moveRightTitle?: ReactNode;
  allToLeft?: boolean;
  allToRight?: boolean;
  moveAllLeftTitle?: ReactNode;
  moveAllRightTitle?: ReactNode;
  label?: ReactNode;
  isRequired?: boolean;
  helperText?: ReactNode;
  noValueTitle?: ReactNode;
  noOptionsTitle?: ReactNode;
  filterOptionsTitle?: ReactNode;
  filterValueTitle?: ReactNode;
  filterValueText?: ReactNode;
  filterOptionsText?: ReactNode;
  description?: ReactNode;
  hideLabel?: boolean;
  id?: string;
  state?: AnyObject,
  sortOptions?: VoidFunction,
  filterOptions?: VoidFunction,
  leftValues?: DualListSelectOption[];
  rightValues?: DualListSelectOption[];
  renderStatus?: RenderStatusFunction;
  handleOptionsClick?: HandleOptionsFunction,
  handleMoveRight: VoidFunction,
  handleMoveLeft: VoidFunction,
  handleClearLeftValues: VoidFunction,
  handleClearRightValues: VoidFunction,
  sortValues: VoidFunction,
  filterValues: VoidFunction,
  handleValuesClick: HandleOptionsFunction,
  FormGroupProps: FormGrpProps,
  ListProps: ListProps,
  LeftListProps: ListProps,
  RightListProps: ListProps,
  ListItemProps: React.HTMLProps<HTMLDivElement>,
  LeftListItemProps: React.HTMLProps<HTMLDivElement>,
  RightListItemProps: React.HTMLProps<HTMLDivElement>,
  ToolbarProps: ToolbarProps,
  LeftToolbarProps: ToolbarProps,
  RightToolbarProps: ToolbarProps,
  FilterFieldProps: TextInputProps,
  LeftFilterFieldProps: TextInputProps,
  RightFilterFieldProps: TextInputProps,
  SearchIconProps: SVGIconProps,
  LeftSearchIconProps: SVGIconProps,
  RightSearchIconProps: SVGIconProps,
  SearchIconButtonProps: ButtonProps,
  LeftSearchIconButtonProps: ButtonProps,
  RightSearchIconButtonProps: ButtonProps,
  SortIconButtonProps: ButtonProps,
  LeftSortIconButtonProps: ButtonProps,
  RightSortIconButtonProps: ButtonProps,
  SortIconProps: SVGIconProps,
  LeftSortIconProps: SVGIconProps,
  RightSortIconProps: SVGIconProps,
  InternalGridProps: GridProps,
  ListGridProps: GridItemProps,
  LeftListGridProps: GridItemProps,
  RightListGridProps: GridItemProps,
  TitleProps: TextContentProps,
  LeftTitleProps: TextContentProps,
  RightTitleProps: TextContentProps,
  ButtonsGridProps: GridItemProps,
  ButtonsInternalFlexProps: FlexProps,
  ButtonFlexProps: FlexItemProps,
  ToRightFlexProps: FlexItemProps,
  IconButtonProps: ButtonProps,
  ToRightIconButtonProps: ButtonProps,
  IconProps: SVGIconProps,
  AllToRightFlexProps: FlexItemProps,
  AllToRightIconButtonProps: ButtonProps,
  AllToLeftFlexProps: FlexProps,
  AllToLeftIconButtonProps: ButtonProps,
  ToLeftFlexProps: FlexProps,
  ToLeftIconButtonProps: ButtonProps,
  ToRightIconProps: SVGIconProps,
  AllToRightIconProps: SVGIconProps,
  AllToLeftIconProps: SVGIconProps,
  ToLeftIconProps: SVGIconProps
}

export type DualListSelectProps = InternalDualListSelectProps & FormGroupProps & UseFieldApiComponentConfig;

declare const DualListSelect: React.ComponentType<DualListSelectProps>;

export default DualListSelect;
