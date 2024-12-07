async function loadShows() {
    const response = await fetch('shows.csv'); // Path to your CSV file
    const csvText = await response.text();
  
    // Parse CSV data
    const rows = csvText.trim().split('\n').map(row => row.split(','));
  
    // Extract headers and rows
    const headers = rows.shift(); // Skip headers if present
    const table = document.getElementById('shows-table');
    const nextShowContainer = document.querySelector('.ss-nextShow .hardLight'); // Next show container
  
    // Get today's date
    const today = new Date();
  
    // Track the next upcoming show
    let nextShow = null;
  
    // Populate table rows with upcoming shows
    rows.forEach(row => {
      const [date, venue, link, location, time] = row;
  
      // Convert the date from the CSV to a Date object
      const showDate = new Date(date);
  
      // Only display upcoming shows
      if (showDate >= today) {
        // Add to the shows table
        const tr = document.createElement('tr');
        tr.className = 'animatableY';
        tr.innerHTML = `
          <td>${date}</td>
          <td><span class="white"><a href="${link}">${venue}</a></span><br />${location}</td>
          <td>${time}</td>
        `;
        table.appendChild(tr);
  
        // Update nextShow if it's earlier than the current nextShow
        if (!nextShow || showDate < new Date(nextShow.date)) {
          nextShow = { date, venue, location, link };
        }
      }
    });
  
    // Update the next show section
    if (nextShow) {
      nextShowContainer.innerHTML = `
        ${nextShow.date} | <a href="${nextShow.link}" class="white">${nextShow.venue}</a> - ${nextShow.location}
      `;
    } else {
      nextShowContainer.innerHTML = 'No upcoming shows.';
    }
  }
  
  // Load shows on page load
  window.addEventListener('DOMContentLoaded', loadShows);
  