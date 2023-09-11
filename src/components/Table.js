import { useContext } from "react";
import { VigenereContext } from "../App";

const Table = () => {
  const { letters, table, col, row } = useContext(VigenereContext);

  return (
    <table>
      <tbody>
        {letters.split("").map((_, i) => (
          <tr
            key={i}
            style={{ backgroundColor: i === row ? "red" : "transparent" }}
          >
            {letters.split("").map((_, j) => (
              <td
                key={j}
                style={{
                  backgroundColor:
                    i === row && j === col
                      ? "purple"
                      : j === col
                      ? "red"
                      : "transparent",
                }}
              >
                {table[i][j]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
