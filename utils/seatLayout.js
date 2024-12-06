function seatLayout() {
    const totalSeats = 50;
    const rows = 9;
    const leftSeatsPerRow = 2;
    const rightSeatsPerRow = 3;
    const backSeatsCount = totalSeats - (rows * (leftSeatsPerRow + rightSeatsPerRow));
    let seatLayout = [];
    let seatNumber = 1;
  
    // Generate left side seats
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= leftSeatsPerRow; col++) {
        seatLayout.push({
          seatNumber: seatNumber++,
          position: `Left-${row}-${col}`,
          bookedBy: null,
        });
      }
    }
  
    // Generate right side seats
    for (let row = 1; row <= rows; row++) {
      for (let col = 1; col <= rightSeatsPerRow; col++) {
        seatLayout.push({
          seatNumber: seatNumber++,
          position: `Right-${row}-${col}`,
          bookedBy: null,
        });
      }
    }
  
    // Generate back seats
    for (let backSeat = 1; backSeat <= backSeatsCount; backSeat++) {
      seatLayout.push({
        seatNumber: seatNumber++,
        position: `Back-${backSeat}`,
        bookedBy: null,
      });
    }
  
    return seatLayout;
  }
  
  
  export default seatLayout;