<div class="section-divider"></div>

<style>
	.section-divider {
		height: 1px;
		background: var(--border-faint);
		position: relative;
		overflow: hidden;
	}
	.section-divider::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--border-hard), transparent);
		animation: divScan 6s linear infinite;
	}
	@keyframes divScan {
		0% { left: -100%; right: 100%; }
		100% { left: 100%; right: -100%; }
	}
</style>
