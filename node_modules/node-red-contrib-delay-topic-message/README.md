# Node-red node delay-topic-message

<p>
    <strong>Basic usage</strong>
</p>
<p>
    Delay message by set seconds.
</p>
<p>
    When received <code>msg</code> with same <code>topic</code>, timer is reset and previous message is discarded (delivered is last message in <code>topic</code> within timer only).
</p>
<p>
    <strong>Message options</strong>
</p>
<ul>
    <li>
        <code>msg.stopTimer</code>: If set to <code>true</code>, timer is stopped and message in <code>topic</code> is discarded.
    </li>
    <li>
        <code>msg.delay</code>: Overrides default delay in timer.
    </li>
    <li>
        <code>msg.stopAll</code>: If set to <code>true</code>, all timers and messages, regardless of topic, are discarded.
    </li>
</ul>
