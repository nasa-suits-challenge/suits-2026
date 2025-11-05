from dataclasses import dataclass

@dataclass
class Utterance:
    text: str
    confidence: float

def concise_numeric(label: str, value: float, units: str, confidence: float = 1.0) -> Utterance:
    # Example: "Primary O2 47%"
    return Utterance(text=f"{label} {value}{units}", confidence=confidence)
