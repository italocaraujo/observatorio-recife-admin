import { JSX } from "react";

interface SubOption {
  id: number;
  name: string;
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