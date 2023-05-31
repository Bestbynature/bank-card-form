import { createSlice } from "@reduxjs/toolkit"; 
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    card: JSON.parse(localStorage.getItem("cardList")) || [],
    front: true,
    CN: '################',
    holder: "Cardholder's name",
    holder2: "Cardholder's name",
    month: '',
    year: '',
    CVV: '',
    time: 7
};

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        addCard: (state, action) => {
            state.card.push(action.payload);
            state.total += action.payload.price;
            state.quantity += 1;
        },
        switcher: (state) => {
            state.front = !state.front;
        },
        setCN: (state, { payload }) => {
            if(!payload || payload === '') state.CN = '################';
            else{
               const numericValue = payload.replace(/\D/g, '');
               
               state.CN = numericValue
            }
        },
        setHolder: (state, { payload }) => {
            if(!payload){
                state.holder = "Cardholder's name";
                state.holder2 = "Cardholder's name";
            } 
            else{
                const value = payload.replace(/\d/g, '').toUpperCase();
                state.holder = value;
                state.holder2 = value;
            }
        },
        setHolder2: (state, { payload }) => {
             let result = [];
                payload.split(' ').forEach((item)=>{
                    result.push(item[0].toUpperCase() + item.slice(1).toLowerCase())
                })
                result = result.join(' ');
                state.holder2 = result;
            },
        setMonth: (state, { payload }) => {
            if(payload === '') state.month = 'Month'
            else state.month = payload;
            },
        setYear: (state, { payload }) => {
            if(payload === '') state.year = 'Year'
            else state.year = payload;
            },
        setCVV: (state, { payload }) => {
                if(!payload) state.CVV = '';
                else{
                    const numericValue = payload.replace(/\D/g, '');
                    state.CVV = numericValue;
                }
            },
        setTime: (state) => {
                state.time = state.time - 1
            },
        resetCard: (state) => {
            const newCard = {
                id: uuidv4(),
                name: state.holder2,
                number: state.CN,
                month: state.month,
                year: state.year,
                CVV: state.CVV,
            }
            state.card = [...state.card, newCard];
            localStorage.setItem("cardList", JSON.stringify(state.card))
            state.front = true,
            state.CN = '################',
            state.holder = "Cardholder's name",
            state.holder2 = "Cardholder's name",
            state.month = '',
            state.year = '',
            state.CVV = '',
            state.time = 7
        },
        handleDelete: (state, { payload }) => {
            state.card = state.card.filter((item) => item.id !== payload);
            localStorage.setItem("cardList", JSON.stringify(state.card));
        }
    }
});

export const { addCard, setTime, switcher,resetCard, setCN, setHolder, setHolder2, setMonth, setYear, setCVV, handleDelete } = cardSlice.actions;
export default cardSlice.reducer;