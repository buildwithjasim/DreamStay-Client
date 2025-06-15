// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// export default function Offers() {
//   const { showModal, setShowModal } = useState(true);
//   return (
//     <div>
//       {' '}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             className="bg-white p-6 rounded-lg"
//           >
//             <h2 className="text-2xl font-bold">Special Offer!</h2>
//             <p>Book now and get 20% off your stay!</p>
//             <button
//               onClick={() => setShowModal(false)}
//               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Close
//             </button>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }
