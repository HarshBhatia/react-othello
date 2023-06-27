export default function Tile({ tile, onClick }) {
  return (
    <div
      onClick={tile == 3 ? onClick : null}
      className={`tile ${["", "black", "white", "playable"][tile]}`}
    />
  );
}
