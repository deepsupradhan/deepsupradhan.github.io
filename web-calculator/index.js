* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "open Sans", sans-serif;
}
body {
  transition: 0.8s;
}

.grid-container {
  display: grid;
  align-content: center;
  grid-template-columns: auto auto auto auto;
  gap: 1px;
  background-color: #044981;
  padding: 2px;
  margin-bottom: 1px;
}

.result {
  grid-row: 1;
  grid-column: 1 / span 4;
  font-size: 8vh;
  height: 31vh !important;
  width: 100%;
}

.input-button {
  font-size: 4vh;
  color: rgb(17, 16, 16);
  cursor: pointer;
  border: none;
  height: 10.2vh;
  outline: none;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  text-align: center;
}
.item6 {
  grid-row: 7;
  grid-column: 1 / span 2;
  font-size: 3vh;
}

.item7 {
  grid-row: 7;
  grid-column: 3 / span 2;
  font-size: 8vh;
}

input[type="button"]:hover {
  background-color: rgba(37, 37, 59);
  color: #fff;
}
