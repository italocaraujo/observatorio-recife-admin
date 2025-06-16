import { JSX } from "react";

export interface SubOption {
  id: number;
  name: string;
  subOptions?: SubOption[];
}

export interface DestinationOption {
  id: number;
  name: string;
  icon: JSX.Element;
  subOptions?: SubOption[];
}

export interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
  selectedDestination: number | null;
  options: DestinationOption[];
  onReset: () => void;
  selectedSubDestination?: number | null;
  onSelectSubDestination?: (id: number) => void;
}