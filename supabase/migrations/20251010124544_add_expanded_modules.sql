/*
  # Add Expanded Modules to Match README Curriculum

  1. Changes
    - Updates existing 3 modules with expanded descriptions
    - Adds 4 new modules (Modules 4-7) to match comprehensive curriculum
    - All modules properly ordered and configured with appropriate icons
    - Estimated completion times reflect content depth
  
  2. New Modules Added
    - Module 4: IPFS and Filecoin Integration
    - Module 5: Retrieval and Data Access
    - Module 6: Storage Proofs and Verification
    - Module 7: Building Production Applications
  
  3. Notes
    - Uses IF EXISTS checks for safe execution
    - Preserves existing module IDs for data integrity
    - New modules ready for lesson content to be added
*/

-- Update existing modules with expanded descriptions
UPDATE modules 
SET description = 'Dive deep into Content Identifiers (CIDs), the foundation of Filecoin''s data architecture. Learn how content addressing enables verifiable, permanent, and tamper-proof data storage.',
    estimated_minutes = 45
WHERE title = 'Understanding CIDs';

UPDATE modules 
SET description = 'Master the economics and mechanics of storage deals on Filecoin. Understand how to negotiate, monitor, and manage storage agreements with storage providers.',
    estimated_minutes = 60
WHERE title = 'Storage Deals';

UPDATE modules 
SET description = 'Unlock the power of the Filecoin Virtual Machine (FVM) to create smart contracts that interact with storage primitives. Deploy EVM-compatible contracts and build data-driven applications.',
    estimated_minutes = 90
WHERE title = 'FVM Smart Contracts';

-- Add new Module 4: IPFS and Filecoin Integration
INSERT INTO modules (title, description, order_index, icon, estimated_minutes)
SELECT 
  'IPFS and Filecoin Integration',
  'Learn how IPFS and Filecoin work together to provide both fast retrieval and long-term archival storage. Build applications that leverage both protocols.',
  4,
  'Network',
  75
WHERE NOT EXISTS (
  SELECT 1 FROM modules WHERE title = 'IPFS and Filecoin Integration'
);

-- Add new Module 5: Retrieval and Data Access
INSERT INTO modules (title, description, order_index, icon, estimated_minutes)
SELECT 
  'Retrieval and Data Access',
  'Master the retrieval market and learn strategies for fast, cost-effective data access from the Filecoin network.',
  5,
  'Download',
  60
WHERE NOT EXISTS (
  SELECT 1 FROM modules WHERE title = 'Retrieval and Data Access'
);

-- Add new Module 6: Storage Proofs and Verification
INSERT INTO modules (title, description, order_index, icon, estimated_minutes)
SELECT 
  'Storage Proofs and Verification',
  'Deep dive into the cryptographic proofs that make Filecoin trustless and verifiable. Learn how Proof-of-Replication and Proof-of-Spacetime work.',
  6,
  'Shield',
  80
WHERE NOT EXISTS (
  SELECT 1 FROM modules WHERE title = 'Storage Proofs and Verification'
);

-- Add new Module 7: Building Production Applications
INSERT INTO modules (title, description, order_index, icon, estimated_minutes)
SELECT 
  'Building Production Applications',
  'Put everything together to build, test, and deploy production-grade applications on Filecoin. Learn best practices, tooling, and deployment strategies.',
  7,
  'Rocket',
  120
WHERE NOT EXISTS (
  SELECT 1 FROM modules WHERE title = 'Building Production Applications'
);
