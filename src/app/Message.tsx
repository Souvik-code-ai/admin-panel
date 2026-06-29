import { useState,useRef } from "react";
import { messagesData } from "./Data";
import { PageHeader } from "./components/ui/Pageheader";
import { Card } from "./components/ui/card";
import { Td } from "./components/ui/Td";
import { Th } from "./components/ui/Th";
import { Modal } from "./components/ui/Modal";
import { StatusBadge } from "./components/ui/Statusbadge";
import { Mail,Phone ,Eye,Archive,Trash2,Send} from "lucide-react";
import { Btn } from "./components/ui/Btn";
export const MessagesPage = () => {
  const [messages, setMessages] = useState(messagesData);
  const [viewMsg, setViewMsg] = useState<(typeof messagesData)[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyError, setReplyError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<
    (typeof messagesData)[0] | null
  >(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const replyRef = useRef<HTMLTextAreaElement>(null);

  // ── derived list ────────────────────────────────────────────────────────────

  const filteredMessages = messages.filter((m) => {
    if (activeFilter === "All") return m.status !== "Archived";
    return m.status === activeFilter;
  });

  const counts = {
    All: messages.filter((m) => m.status !== "Archived").length,
    New: messages.filter((m) => m.status === "New").length,
    Replied: messages.filter((m) => m.status === "Replied").length,
  };

  // ── handlers ────────────────────────────────────────────────────────────────

  const openView = (msg: (typeof messagesData)[0], focusReply = false) => {
    setViewMsg(msg);
    setReplyText("");
    setReplyError("");
    if (focusReply) {
      // focus after modal renders
      setTimeout(() => replyRef.current?.focus(), 150);
    }
  };

  const closeView = () => {
    setViewMsg(null);
    setReplyText("");
    setReplyError("");
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      setReplyError("Reply cannot be empty.");
      replyRef.current?.focus();
      return;
    }
    // Mark as Replied
    setMessages((prev) =>
      prev.map((m) => (m.id === viewMsg!.id ? { ...m, status: "Replied" } : m)),
    );
    closeView();
  };

  const handleArchive = (id: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "Archived" } : m)),
    );
    closeView();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    if (viewMsg?.id === deleteTarget.id) closeView();
    setDeleteTarget(null);
  };

  // ── render ──────────────────────────────────────────────────────────────────

  return (
    <div>
      <PageHeader
        title="Messages"
        subtitle="Manage incoming leads, inquiries, and partnership requests."
      />

      {/* Filter tabs */}
      <div className="flex gap-3 mb-6">
        {(["All", "New", "Replied"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors flex items-center gap-2 ${
              activeFilter === f
                ? "border-[#0F4C81] text-[#0F4C81] bg-[#EFF6FF]"
                : "border-[#E2E8F0] bg-white hover:border-[#0F4C81] hover:text-[#0F4C81]"
            }`}
          >
            {f}
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeFilter === f
                  ? "bg-[#0F4C81] text-white"
                  : "bg-[#F1F5F9] text-[#64748B]"
              }`}
            >
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <Th>Sender</Th>
                <Th>Subject</Th>
                <Th>Message</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-sm text-[#94A3B8]"
                  >
                    No messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((m) => (
                  <tr
                    key={m.id}
                    className={`hover:bg-[#F8FAFC] transition-colors ${
                      m.status === "New" ? "bg-[#FAFBFF]" : ""
                    }`}
                  >
                    <Td>
                      <div>
                        <p
                          className={`font-medium text-[#0F172A] ${
                            m.status === "New" ? "font-semibold" : ""
                          }`}
                        >
                          {m.name}
                        </p>
                        <p className="text-[#94A3B8] text-xs">{m.email}</p>
                      </div>
                    </Td>
                    <Td className="font-medium">{m.subject}</Td>
                    <Td className="text-[#64748B] max-w-xs">
                      <p className="truncate">{m.message}</p>
                    </Td>
                    <Td className="text-[#64748B] text-xs">{m.date}</Td>
                    <Td>
                      <StatusBadge status={m.status} />
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1">
                        {/* View */}
                        <button
                          onClick={() => openView(m)}
                          title="View message"
                          className="p-1.5 rounded-md hover:bg-[#EFF6FF] text-[#94A3B8] hover:text-[#0F4C81] transition-colors"
                        >
                          <Eye size={14} />
                        </button>

                        {/* Send reply — opens modal focused on reply box */}

                        {/* Delete */}
                      </div>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Message Detail Modal ── */}
      {viewMsg && (
        <Modal title="Message Details" isOpen={!!viewMsg} onClose={closeView}>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-[#0F172A]">{viewMsg.name}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Mail size={11} />
                    {viewMsg.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={11} />
                    {viewMsg.phone}
                  </span>
                </div>
              </div>
              <StatusBadge status={viewMsg.status} />
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#64748B] mb-1">
                SUBJECT
              </p>
              <p className="font-semibold text-[#0F172A] text-sm">
                {viewMsg.subject}
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#64748B] mb-2">
                MESSAGE
              </p>
              <p className="text-sm text-[#0F172A] leading-relaxed">
                {viewMsg.message}
              </p>
            </div>

            <p className="text-xs text-[#94A3B8]">Received: {viewMsg.date}</p>

            {/* Reply section */}
            <div className="space-y-2 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                  Your Reply
                </label>
                <textarea
                  ref={replyRef}
                  rows={4}
                  value={replyText}
                  onChange={(e) => {
                    setReplyText(e.target.value);
                    if (e.target.value.trim()) setReplyError("");
                  }}
                  placeholder="Type your reply here..."
                  className={`w-full border rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] resize-none ${
                    replyError ? "border-red-400" : "border-[#E2E8F0]"
                  }`}
                />
                {replyError && (
                  <p className="text-xs text-red-500 mt-1">{replyError}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Btn icon={Send} onClick={handleSendReply}>
                  Send Reply
                </Btn>
                <Btn
                  variant="secondary"
                  icon={Archive}
                  onClick={() => handleArchive(viewMsg.id)}
                >
                  Archive
                </Btn>
                <Btn
                  variant="danger"
                  icon={Trash2}
                  onClick={() => {
                    setDeleteTarget(viewMsg);
                    closeView();
                  }}
                >
                  Delete
                </Btn>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <Modal
          title="Delete Message"
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
        >
          <div className="space-y-4">
            <p className="text-sm text-[#64748B]">
              Are you sure you want to delete the message from{" "}
              <span className="font-semibold text-[#0F172A]">
                {deleteTarget.name}
              </span>
              ? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <Btn variant="secondary" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Btn>
              <Btn variant="danger" icon={Trash2} onClick={handleDelete}>
                Delete
              </Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};