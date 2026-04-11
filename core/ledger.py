import json
from datetime import datetime

class SovereignLedger:
    def __init__(self):
        self.split_ratio = 0.50
        self.accounts = {
            "PRIMARY": "FNB Corporate - Settlement Acc",
            "SECONDARY": "African Bank - Business Acc"
        }

    def process_transaction(self, amount_zar):
        """Calculates the 50/50 split and logs payout instructions."""
        owner_payout = amount_zar * self.split_ratio
        system_reinvest = amount_zar * self.split_ratio
        
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_entry = (
            f"[{timestamp}] TOTAL: R{amount_zar} | "
            f"OWNER (FNB): R{owner_payout} | "
            f"SYSTEM: R{system_reinvest}\n"
        )
        
        with open("revenue_log.txt", "a") as f:
            f.write(log_entry)
            
        print(f"[LEDGER] Payout Instruction Generated for R{owner_payout}")
        return owner_payout

if __name__ == "__main__":
    Ledger = SovereignLedger()
    Ledger.process_transaction(1500) # Test Platinum Split
