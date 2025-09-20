import Board from "../components/ColumnView";
import { type Card } from "../types";
import "../main.css";
import "../components/CardModal.css";


const Home = () => {
    return (
    <div>  
        <Board columns={[]} cards={[]} onCardClick={function (_card: Card): void {
                throw new Error("Function not implemented.");
            } } onAddCard={function (_columnId: string): void {
                throw new Error("Function not implemented.");
            } } />
    </div>
    );
};

export default Home;
