import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { config } from "../../config";

export const CardDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  day: number | null;
  allDaysCompleted: boolean;
  setShowCongratulations: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isOpen, onClose, day, allDaysCompleted, setShowCongratulations }) => {
  const data = config.cardsData;
  const cardData = day && data[day - 1] ? data[day - 1] : null;

  const handleClose = () => {
    onClose();
    if (allDaysCompleted) {
      setShowCongratulations(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {cardData && (
        <DialogContent className="bg-gradient-to-br from-green-800 to-red-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {cardData.title}
            </DialogTitle>
            <DialogDescription className="text-green-200">
              Day {day} - {cardData.shortDescription}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <img
              src={cardData.image}
              alt={cardData.title}
              className="w-full h-fit object-cover rounded-md mb-4"
            />
            <p className="text-red-200">{cardData.description}</p>
          </div>
          <Button
            onClick={handleClose}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
          >
            Close
          </Button>
        </DialogContent>
      )}
    </Dialog>
  );
};

export const CongratulationsDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="bg-gradient-to-br from-green-800 to-red-800 text-white">
      <DialogHeader>
        <DialogTitle className="text-3xl font-bold text-yellow-300">
          {config.congratulationsCard.title}
        </DialogTitle>
      </DialogHeader>
      <div className="mt-4">
        <p className="text-xl text-green-200">
          {config.congratulationsCard.description[0]}
        </p>
        <p className="mt-4 text-red-200">
          {config.congratulationsCard.description[1]}
        </p>
        <p className="mt-4 text-yellow-200">
          {config.congratulationsCard.description[2]}
        </p>
      </div>
    </DialogContent>
  </Dialog>
);
