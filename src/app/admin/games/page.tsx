"use client";

import { useState } from "react";
import { Game } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/context/DataContext";
import { generateId, exportToCsv } from "@/lib/utils";

export default function AdminGamesPage() {
  const { games, setGames, removeGame: removeGameFromContext } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const gameData: Omit<Game, 'id'> = {
      teamA: formData.get('teamA') as string,
      teamB: formData.get('teamB') as string,
      date: formData.get('date') as string,
      status: formData.get('status') as Game['status'],
      venue: formData.get('venue') as string,
      basePrice: Number(formData.get('basePrice')),
    };

    if (editingGame) {
      const updatedGames = games.map(g => g.id === editingGame.id ? { ...editingGame, ...gameData } : g);
      setGames(updatedGames);
      toast({ title: "Game Updated", description: "The game details have been successfully updated." });
    } else {
      const newGame: Game = { ...gameData, id: generateId('g') };
      setGames(prevGames => [...prevGames, newGame]);
      toast({ title: "Game Added", description: "The new game has been added to the schedule." });
    }
    
    setIsDialogOpen(false);
    setEditingGame(null);
  };
  
  const openEditDialog = (game: Game) => {
    setEditingGame(game);
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingGame(null);
    setIsDialogOpen(true);
  };

  const removeGame = (gameId: string) => {
    removeGameFromContext(gameId);
    toast({ title: "Game Removed", description: "The game has been removed from the schedule.", variant: "destructive"});
  }

  const handleExport = () => {
    exportToCsv('games.csv', games);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 p-8 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight font-headline uppercase">Game Schedule</h2>
            <p className="text-muted-foreground">Add, edit, or remove games.</p>
          </div>
          <div className="flex gap-2">
              <Button onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
              </Button>
              <Button onClick={openNewDialog}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Game
              </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto px-8 pb-8">
        <Card>
          <CardContent className="mt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Game</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {games.map(game => (
                  <TableRow key={game.id}>
                    <TableCell className="font-medium">{game.teamA} vs {game.teamB}</TableCell>
                    <TableCell>{new Date(game.date).toLocaleDateString()}</TableCell>
                    <TableCell>{game.venue}</TableCell>
                    <TableCell>
                      <Badge variant={game.status === 'Tickets Available' ? 'default' : 'secondary'} className={game.status === 'Tickets Available' ? 'bg-accent' : ''}>
                        {game.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => openEditDialog(game)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => removeGame(game.id)} className="text-destructive">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingGame ? 'Edit Game' : 'Add New Game'}</DialogTitle>
            <DialogDescription>
              {editingGame ? 'Update the details for this game.' : 'Enter the details for the new game.'}
            </DialogDescription>
          </DialogHeader>
          <form id="game-form" onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teamA" className="text-right">Team A</Label>
                <Input id="teamA" name="teamA" defaultValue={editingGame?.teamA} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teamB" className="text-right">Team B</Label>
                <Input id="teamB" name="teamB" defaultValue={editingGame?.teamB} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input id="date" name="date" type="date" defaultValue={editingGame?.date} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="venue" className="text-right">Venue</Label>
                <Input id="venue" name="venue" defaultValue={editingGame?.venue} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="basePrice" className="text-right">Base Price</Label>
                <Input id="basePrice" name="basePrice" type="number" defaultValue={editingGame?.basePrice} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="status" className="text-right">Status</Label>
                  <Select name="status" defaultValue={editingGame?.status}>
                    <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Tickets Available">Tickets Available</SelectItem>
                        <SelectItem value="No Tickets Yet">No Tickets Yet</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button type="submit" form="game-form">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
