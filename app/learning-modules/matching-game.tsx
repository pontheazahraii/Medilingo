"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, Trophy, X, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Confetti from "react-confetti";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MatchingPair = {
  id: number;
  term: string;
  definition: string;
};

type GameItem = {
  id: number;
  content: string;
  pairId: number;
  matched: boolean;
  type: "term" | "definition";
};

type MatchingGameProps = {
  items: MatchingPair[];
  onComplete: (score: number, timeSpent: number) => void;
};

export const MatchingGame = ({ items, onComplete }: MatchingGameProps) => {
  const router = useRouter();
  const [gameItems, setGameItems] = useState<GameItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);

  // Initialize the game
  useEffect(() => {
    // Create an array with terms and definitions as separate items
    const terms = items.map((item) => ({
      id: item.id * 2 - 1,
      content: item.term,
      pairId: item.id,
      matched: false,
      type: "term" as const
    }));
    
    const definitions = items.map((item) => ({
      id: item.id * 2,
      content: item.definition,
      pairId: item.id,
      matched: false,
      type: "definition" as const
    }));
    
    // Combine and shuffle
    const combined = [...terms, ...definitions].sort(() => Math.random() - 0.5);
    
    setGameItems(combined);
  }, [items]);

  // Start timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isGameComplete) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isGameComplete]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleItemClick = (id: number) => {
    // Ignore if item is already matched
    const clickedItem = gameItems.find(item => item.id === id);
    if (clickedItem?.matched) return;
    
    // Don't allow selecting more than 2 items
    if (selectedItems.length === 2) return;
    
    // Don't allow selecting the same item twice
    if (selectedItems.includes(id)) return;
    
    const newSelectedItems = [...selectedItems, id];
    setSelectedItems(newSelectedItems);
    
    // Check for match if we've selected 2 items
    if (newSelectedItems.length === 2) {
      const item1 = gameItems.find(item => item.id === newSelectedItems[0]);
      const item2 = gameItems.find(item => item.id === newSelectedItems[1]);
      
      if (item1 && item2 && item1.pairId === item2.pairId) {
        // It's a match!
        setGameItems(prev => 
          prev.map(item => 
            item.id === item1.id || item.id === item2.id 
              ? { ...item, matched: true } 
              : item
          )
        );
        
        setMatchedPairs(prev => prev + 1);
        setSelectedItems([]);
        
        // Check if game is complete
        if (matchedPairs + 1 === items.length) {
          setIsGameComplete(true);
          const score = Math.max(100 - Math.floor(timer / 5), 10); // Score decreases with time
          onComplete(score, timer);
        }
      } else {
        // Not a match, clear selection after a delay
        setTimeout(() => {
          setSelectedItems([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    // Shuffle items again
    setGameItems(prev => [...prev].sort(() => Math.random() - 0.5).map(item => ({ ...item, matched: false })));
    setSelectedItems([]);
    setMatchedPairs(0);
    setTimer(0);
    setIsGameComplete(false);
  };

  return (
    <div className="flex h-full flex-col p-4">
      {isGameComplete && <Confetti recycle={false} numberOfPieces={200} />}
      
      <div className="flex items-center justify-between mb-4">
        <Button onClick={() => router.push("/learn")} variant="ghost" size="sm">
          <X className="h-4 w-4 mr-2" />
          Exit
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-md">
            <Trophy className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-blue-500">{matchedPairs}/{items.length}</span>
          </div>
          
          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-md">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="font-medium text-amber-500">{formatTime(timer)}</span>
          </div>
        </div>
        
        <Button onClick={resetGame} variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1">
        {gameItems.map((item) => (
          <Card 
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className={cn(
              "cursor-pointer p-4 flex items-center justify-center transition-all text-center",
              item.matched && "bg-green-50 border-green-200",
              selectedItems.includes(item.id) && !item.matched && "bg-blue-50 border-blue-200",
              !selectedItems.includes(item.id) && !item.matched && "hover:border-blue-200"
            )}
          >
            <span className={cn(
              "text-sm md:text-base",
              item.type === "definition" && "italic",
              (item.matched || selectedItems.includes(item.id)) ? "visible" : "invisible"
            )}>
              {item.content}
            </span>
          </Card>
        ))}
      </div>
      
      {isGameComplete && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg text-center">
          <h3 className="text-xl font-bold text-green-700">Great job!</h3>
          <p className="text-green-600">You completed the matching challenge in {formatTime(timer)}</p>
          <Button 
            onClick={() => router.push("/learn")} 
            variant="primary"
            className="mt-3"
          >
            Continue Learning
          </Button>
        </div>
      )}
    </div>
  );
}; 