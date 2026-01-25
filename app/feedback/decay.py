def apply_supplier_decay(option, history):
    failures = history.get(option.supplier, 0)
    decay = min(0.15, failures * 0.02)
    option.supplier_reliability -= decay
    option.supplier_reliability = max(0, option.supplier_reliability)
    return option
