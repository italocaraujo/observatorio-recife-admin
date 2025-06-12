import { JSX } from "react";

export interface DestinationOption {
  id: number;
  name: string;
  icon: JSX.Element;
}

export interface DestinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
  selectedDestination: number | null;
  options: DestinationOption[];
  onReset: () => void;
}